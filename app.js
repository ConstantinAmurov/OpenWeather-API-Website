const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
res.sendFile(__dirname + "/index.html");
});

app.post("/", (req,res) => {
const query = req.body.cityName;
const appid="d06ae9bab4ea128892f2c8186bc27700";
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?appid="+ appid +"&q="+query+"&units=" +units;
console.log(url);

https.get(url, function(response) {
  response.on("data", function(data) {
    const weatherData = JSON.parse(data);
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const location = weatherData.name;
    const icon = weatherData.weather[0].icon;
    const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.write("<p>The weather is currently " + description + "</p1>")
    res.write("<h1>The temperature in " + location + " is " + temperature + " degrees</h1>");
    res.write("<img src='"+iconURL+"' alt=''>");
    res.send();
  });
})
});



app.listen(3000, () => console.log("Server is running on port 3000"));
