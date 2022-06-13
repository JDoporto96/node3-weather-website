const request = require('request');

const forecast=(lat,lon,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=8f98a2f0ba6332bcbd8a4cb853be361f&query='+lat+','+lon;

    request({url:url,json:true},(error,response)=>{
        if(error){
           callback('Unable to connect to weather services ',undefined);
        }else if(response.body.error){
           callback('Unable to find location. Try another search', undefined)
           console.log(response.body);
        }else{
           callback(undefined,response.body.current.weather_descriptions[0]+`. It is ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike}`)
        }
    })
}

module.exports = forecast;