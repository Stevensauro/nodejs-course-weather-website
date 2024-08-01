//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const req = require('postman-request')

const forecast = (lat, lon, callback)=>{

    const url = `http://api.weatherstack.com/current?access_key=29c920e09581e0f22906021748a595ed&units=f&query=${lat},${lon}`

    req( {url, json: true}, (err, {body})=>{

        if(err)
            return callback('Unable to connect to Weatherstack API...\n')
    
        if(body.error)
            return callback(body.error.info)
    
        console.log(body.current)

        return callback(
            undefined,
            `${body.current.weather_descriptions[0]}. ` + 
            `Today's temperature is ${body.current.temperature}°F, ` + 
            `Feels like ${body.current.feelslike}°F — ` +
            `Wind speeds of ${body.current.wind_speed} mph at ${body.current.wind_degree}°`
        )
    })
}

module.exports = forecast