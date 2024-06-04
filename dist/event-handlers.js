const weatherController = new WeatherController()
const weatherManager = new WeatherManager()
const weatherRenderer = new WeatherRenderer()

$(SEARCH_BTN).on("click", function () {
    if (SEARCHED_CITY.val().length) {
        weatherController.getWeather()
    }
})

WEATHER_LIST.on('click', '.fa-plus', function () {
    try {
        const cityName = $(this).closest('.weather-card').find('.city').text();
        const temperature = $(this).closest('.weather-card').find('.temp').text().slice(0, -2);
        const condition = $(this).closest('.weather-card').find('.humidity').text();
        const conditionPic = $(this).closest('.weather-card').find('.wind i').attr('class');

        const newWeatherData = {
            name: cityName,
            temperature: temperature,
            condition: condition,
            conditionPic: conditionPic
        }
        weatherManager.saveCityWeatherData(newWeatherData)

        $(this).removeClass('fa-plus').addClass('fa-trash').css({
            "color": "red",
            "title": "Delete"
        })
    } catch (error) {
        console.error(error);
    }
})

WEATHER_LIST.on('click', '.fa-trash', function () {
    try {
        const cityName = $(this).closest('.weather-card').find('.city').text();
        weatherManager.deleteWeatherByCity(cityName)
        $(this).closest('.weather-card').remove()
    } catch (error) {
        console.error(error);
    }
})

WEATHER_LIST.on('click', '.reload', function () {
    try {
        const cityName = $(this).closest('.weather-card').find('.city').text();
        const weatherCard = $(this).closest('.weather-card');
        weatherController.refreshWeatherData(weatherCard, cityName)
    } catch (error) {
        console.error(error);
    }
})

$("#checkbox").on("change", function () {
    $("body").toggleClass("dark");
});
