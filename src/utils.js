const request = require("request")


const geocode = (address,callback)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+address+"&appid=9c207fd8e8b4fa7b4c7d2cf7efbd7c6a"
    request({ url: url, json:true }, (err,res)=>{
        if(err){
            callback("unable to connedct the server",undefined)
        }else if(res.body.cod == 404){
            callback("no city found",undefined)
        }else{
            const name = res.body.name
            const {lon,lat} = res.body.coord
            callback(undefined,{
                name,
                lon,
                lat
            })
        }
    })
}


const forecast = (lat,lon,callback)=>{
    url = "http://api.weatherstack.com/current?access_key=f13bc6d53c23f5b455a07741967d594b&query="+lat+","+lon
    request({url : url, json: true}, (err,res)=>{
        if(res.body.error){
            callback({error:res.body.error.info},undefined)
        }else if(err){
            callback("unable to connect the server",undefined)
        }else{
            const {temperature,feelslike} =  res.body.current
            callback(undefined,{
                temperature,
                feelslike,
            })
            // console.log(`the current temperature is ${temperature} and it feels like ${feelslike}.`);
        }
    })
}




module.exports = {
    geocode,
    forecast
}