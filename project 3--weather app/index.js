const axios = require('axios'); // legacy way
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine','ejs')
app.set('views','template')
app.get('/', function (req, res) {
//   res.sendFile(__dirname +"/views/home.ejs")
  res.render('home',{temp:null})

    // res.send("Hello World")
})
app.post("/fetch_data",function(req,res){
    const cityname=req.body.city
    console.log(cityname);
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ cityname +"&appid=6d6c18ff2f424ec6c9cb6512ca30c075&units=metric"
    axios.get(url)
    .then(function (response) {
        // handle success
        // res.json(response['data']['main']['temp'])
        // res.sendFile(__dirname + "/template/home.html")
        // res.render("home.html")
        console.log(response['data']['main']['temp']);
        res.render('home',{temp:response['data']['main']['temp']})
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        res.json(error)
    })
    .finally(function () {
        // always executed
    });
})

app.listen(3000)
