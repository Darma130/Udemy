//jshint esversion:6

const express = require("express");

const app = express(); 

//Esta funcion se usa para indicarle al servidor qué debe hacer cuando se reciba una respuesta del explorador
//en este caso lo que se realiza aparecerá en la pagina principal "home" por indicar "/" en el primer parametro
app.get("/", function(req, res) {
    res.send("<h1>Hello, world!</h1>"); //Asi el servidor envia respuestas textuales al explorador
});

app.get("/contact", function(req, res) {
    res.send("Contact me at: darma130@gmail.com");
});

app.get("/about", function(req, res) {
    res.send("Mi nombre es Darmael Vargas, Soy Ingeniero Electronico de la Uniquindio y soy programador en OptiPlant Consultores");
});

app.get("/hobbies", function(re, res) {

    res.send("<ul><li>Coffee</li><li>Code</li><li>Chocolate</li></ul>");
    
});

//especificamos el puerto por el cual se va a escuchar
app.listen(3000, function() {

    console.log("Server started on port 3000");
    
}); 

//asi queda listo el servidor