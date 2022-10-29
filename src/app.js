const exp = require("constants");
const express = require("express")
const res = require("express/lib/response")
const path = require("path")
const hbs = require("hbs");
const { title } = require("process");
const utils = require("./utils.js")




const stat_path = path.join(__dirname,"../public")
const X = path.join(__dirname,"../templates/partials")

const app = express()

app.set("view engine", "hbs")
app.set("views",path.join(__dirname,"../templates/views"))
app.use(express.static(stat_path))
hbs.registerPartials(X)

app.get("", (req,res)=>{
    res.render("index",{
        name:"weather",
        title : "Nafi"
    })
})


app.get("/help", (req,res)=>{
    res.render("help", {
        name: "contact",
        title : "Nafi"
    })
})


app.get("/help/*", (req,res)=>{
    res.render("page_not_found",{
        name: "Help article ot Found",
        title : "Nafi"
    })
})



app.get("/about", (req,res)=>{
    res.render("about",{
        name:"my name is abdul nafih",
        title : "Nafi"
    })
})



app.get("/weather", (req,res)=>{
    if(!req.query.location){
        return res.send({
            error:"please provide the location"
        })
    }
    utils.geocode(req.query.location,(err,data)=>{
        if(err){
            return res.send({err})
        }else{
            utils.forecast(data.lat,data.lon,(err,forecast_data)=>{
                if(err){
                    return res.send({err})
                }else{
                    return res.send({
                        location:req.query.location,
                        temp:forecast_data.temperature,
                        feelslike:forecast_data.feelslike
                    })
                
                }
            })
        }
    })
    
})


app.get("*", (req,res)=>{
    res.render("page_not_found",{
        name:"Page Not Found 404"
    })
})

app.listen(3000, ()=>{
    console.log("port is running on 3000");
})