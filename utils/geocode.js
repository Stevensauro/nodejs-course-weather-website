const req = require('postman-request')

const geocode = (address, callback)=>{

    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&limit=1&format=v5&access_token=pk.eyJ1Ijoic3RldmVuc2F1cnVzIiwiYSI6ImNseHc1NnBpZDB2ZnIybW9leHpyNXRlaHMifQ.4CUdCLfuH-m6ybYlG0_SFg`

    req({url, json: true}, (err, {body})=>{
        if(err)
            return callback('Unable to connect to Mapbox API')
    
        if(body.features.length===0)
            return callback('Unable to identify location, try again with other location')
    
        const latitude = body.features[0].center[1]
        const longitude = body.features[0].center[0]
        const location = body.features[0].place_name
        
        return callback(undefined, {latitude, longitude, location})
    })

}

module.exports = geocode