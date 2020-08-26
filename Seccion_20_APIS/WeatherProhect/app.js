//jshint esversion:6

const express = require("express"); //framework que se complementa con NodeJS para organiar y estructurar mejor el codigo 
const https = require("https"); //esto para trabajar con la api weather
const bodyParser = require("body-parser"); //esto para manipular datos creados por el usuario

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html"); //Asi el servidor puede entregar, como respuesta, un archivo html del sitio
    //web correspondiente ( se usa __dirname para ubicar la ruta en donde se encuentra almacenado el proyecto del 
    //servidor porque con un servidor real subido en la nube no se conoce la direccion exacta donde se encuenta guardado)  
    //res.send("server is up and running.");
});

app.post("/", function(req, res) {
    //console.log(req.body.cityName);

    //ciudad a la que se le obtienen los datos del clima (El dato lo da el usuario)
    const query = req.body.cityName;

    //la api key
    const apiKey = "b26a9e190f591588dfb1c36d972492d1";

    //unidad de medida de la temperatura
    const unit = "metric";

    //inclusion de la api weather
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    //obtenemos toda la informacion del servidor utiliado para esta api
    https.get(url, function(response) {
        console.log(response.statusCode);
        
        response.on("data", function(data) {
            const weatherData = JSON.parse(data); //convierte el dato a formato JSON
            console.log(weatherData);
            const weatherDescription = weatherData.weather[0].description; //obtenemos la temperatura del dato en formato JSON
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon; //obtenemos el dato del icono relacionado con el estado del clima
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; //obenemos el icono desde la api
            //console.log(temp);
            
            res.write("<p>The weather is currently " + weatherDescription + "<p>");
            res.write("<h1>The temterature in " + query + " is " + temp + " degrees Celsius.</h1>"); //se pueden escribir varias respuestas en res antes de enviar
            res.write("<img src=" + imageURL + "></img>");
            res.send(); //hace el envio de todas las respuestas escritas al explorador
        });
    });
});

//especificamos el puerto por el cual se va a escuchar
app.listen(3000, function() {

    console.log("Server started on port 3000");
    
});