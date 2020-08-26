//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser"); //Paquete instalado en el proyecto para poder obtener datos dados por el
//usuario desde la pagina en inputs

const app = express(); 
app.use(bodyParser.urlencoded({extended: true})) //urlencoded elemento comunmente usado para pasar datos de un form html
//bodyparser requiere el elemento "extended: true" para operar correctamente

//Esta funcion se usa para indicarle al servidor qué debe hacer cuando se reciba una respuesta del explorador
//en este caso lo que se realiza aparecerá en la pagina principal "home" por indicar "/" en el primer parametro
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html"); //Asi el servidor puede entregar, como respuesta, un archivo html del sitio
    //web correspondiente ( se usa __dirname para ubicar la ruta en donde se encuentra almacenado el proyecto del 
    //servidor porque con un servidor real subido en la nube no se conoce la direccion exacta donde se encuenta guardado)
});

app.post("/", function(req, res) {

    var num1 = Number(req.body.n1); //con req.body se accede a todos los elementos generados por el usuario en el form del 
    //archivo html, en este caso, como necesitamos almacenar el dato num1, se accede a este con .num1
    var num2 = Number(req.body.n2); //como los datos que se obtienen son tipo texto, en este caso se deben convertir a
    //numero para que se puedan sumar matematicamente, con lo cual usamos "Number" para eso

    var result = num1 + num2;

    res.send("Thae result of calculation is " + result);
})

app.get("/bmicalculator", function(req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html"); //Asi el servidor puede entregar, como respuesta, un archivo html del sitio
    //web correspondiente ( se usa __dirname para ubicar la ruta en donde se encuentra almacenado el proyecto del 
    //servidor porque con un servidor real subido en la nube no se conoce la direccion exacta donde se encuenta guardado)
});

app.post("/bmicalculator", function(req,res) {

    var weight = Number(req.body.weight); //Si se usa parseFloat se convierte el dato tipo texto a numero decimal
    var height = Number(req.body.height); 

    var BMI = weight/(Math.pow(height, 2));

    res.send("Your BMI is " + BMI);

});

//especificamos el puerto por el cual se va a escuchar
app.listen(3000, function() {

    console.log("Server started on port 3000");
    
}); 