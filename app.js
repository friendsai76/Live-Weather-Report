const express = require('express');
const https= require('https');
const bodyParser= require('body-parser');

const app= express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname+"/index.html"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){
  const query= req.body.cityName;
  const Appkey= "e362cba55355479b4789c02c66690721";
  const units= "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ Appkey +"&units="+ units;
  https.get(url,function(response){

    response.on("data",function(data){

      const weatherData= JSON.parse(data);
      const temp= weatherData.main.temp
      const weatherDescription= weatherData.weather[0].description
      const icon= weatherData.weather[0].icon
      const imageUrl= "http://openweathermap.org/img/wn/"+icon +"@2x.png";

      res.write("<p>The weather is Currently "+ weatherDescription+ "</p>");
      res.write("<h1>The Temperature in "+ query +" is " + temp +" degree Celsius</h1>");
      res.write("<img src="+ imageUrl +">")
      res.send();
    });

  })
})

app.listen(5000,function(){
  console.log("Server is running on port 5000");
});
