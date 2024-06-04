class WeatherRenderer {

    constructor() {
        this.source = WEATHER_TEMPLATE.html()
        this.templateWeather = Handlebars.compile(this.source)
    }

    renderWeatherData(weatherData) {
        const lastUpdated = new Date(weatherData.lastUpdated);
        weatherData.lastUpdated = lastUpdated.toLocaleDateString('en-US', options)
        let newHtml = this.templateWeather(weatherData)
        WEATHER_LIST.append(newHtml)
        $('.notfound').remove()
    }

    renderUpdatedWeatherData(weatherCard, weatherData) {
        const lastUpdated = new Date(weatherData.lastUpdated);
        weatherData.lastUpdated = lastUpdated.toLocaleDateString('en-US', options)
        let newHtml = this.templateWeather(weatherData)
        weatherCard.replaceWith(newHtml)
    }


    renderError() {
        // WEATHER_LIST.empty()
        WEATHER_LIST.append("<br><div class='notfound' style='color: red; text-align:center ;'>The searched city could not be found.</div>");
    }
}

