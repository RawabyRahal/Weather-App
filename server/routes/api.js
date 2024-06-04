const express = require('express')
const router = express.Router()
const { default: axios } = require('axios')
const Weather = require('../model/Weather')
const consts = require('../consts');

const api_key = consts.API_KEY
const weatherIcons = consts.WEATHER_ICONS_MAPPING

const createWeather = (weatherData) => {
    return {
        name: weatherData.name,
        temperature: weatherData.main.temp,
        condition: weatherData.weather[0].main,
        conditionPic: weatherIcons[weatherData.weather[0].icon],
        lastUpdated: new Date()
    };
}


router.get('/weather/:cityName', async (req, res) => {
    const cityName = req.params.cityName;
    const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`
    try {
        const weatherPromise = await axios.get(WEATHER_API)
        let weatherData = weatherPromise.data
        weatherData = createWeather(weatherData)
        return res.status(200).send(weatherData);
    }
    catch (error) {
        console.error("Error in Fetching Data: ", error)
        res.status(404).send({ error: "try again!" });
    }
})


router.post('/weather', async (req, res) => {
    try {
        const newCity = new Weather(req.body)
        const savedNewCity = await newCity.save()
        res.status(200).send(savedNewCity)
    }
    catch (error) {
        console.error(error)
        res.status(404).send({ error: "Not saved! try again!" });
    }
})


router.get('/weather', async (req, res) => {
    try {
        const weather = await Weather.find({})
        res.status(200).send(weather)
    }
    catch (error) {
        console.error(error)
        res.status(404).send({ error: "Not Found!" });
    }
})


router.delete('/weather/:cityName', async (req, res) => {
    const cityName = req.params.cityName;
    try {
        const deleteCity = await Weather.findOneAndDelete({ name: cityName })
        res.status(200).send(deleteCity)
    }
    catch (error) {
        console.error(error)
        res.status(404).send({ error: "Not Found!" });
    }
})


module.exports = router