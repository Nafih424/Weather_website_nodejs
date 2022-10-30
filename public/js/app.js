// const { response } = require("express");




const weather = document.querySelector("form")
const search = document.querySelector('input')
const message_one = document.querySelector("#message_one")
const message_two = document.querySelector("message_two")





weather.addEventListener("submit", (e)=>{
    e.preventDefault()
    const location = search.value
    let url = "/weather?location=" + location
    console.log(location.length);
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message_one.textContent = data.error
            }else if(data.err){
                message_one.textContent = data.err
            }else{
                message_one.textContent = `temperature of ${location} is ${data.temp} celsius and it is feelslike ${data.feelslike} celsius`
            }
            
        })
    })
})