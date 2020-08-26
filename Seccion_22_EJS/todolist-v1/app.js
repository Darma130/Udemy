//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); //esto para tener en cuenta el archivo date.js al ejecutar el servidor


const app = express();

const items = ["buy food", "cook food", "eat food"]; //datos para cargar en la lista
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); //USAR SIEMPRE ESTO PARA PUBLICAR EN EL SERVIDOR LOS ARCHIVOS ESTATICOS, COMO 
//STYLES.CSS, LAS IMAGENES Y ASI

app.set("view engine", "ejs"); //esto para uso de ejs con express (debe ponerse despues de "const app = express")

app.get("/", function(req, res) {
    
    const day = date.getDate(); //usamos la funcion que se exporto del archivo date.js

    //con esto añadimos a nuestra lista el contenido de la variable day 
    //en la variable listTitle que se encuentra mencionada en el archivo "list.ejs lo mismo la variable newListItems"
    res.render("list", {listTitle: day, newListItems: items}); 

});

app.post("/", function(req, res) {

    const item = req.body.newItem; //obtenemos el dato proveniente de list.ejs en el form, el input que se llama "newItem" 

    if(req.body.list === "Work") { //esto se hace para que detecte cuando se esta oprimiendo el boton "+" 
        //desde work y en ese caso se almacene el dato ingresado por el uruario en el arreglo de datos que se
        //publican alli
        workItems.push(item);
        res.redirect("/work"); 
    } else {

        items.push(item);
        res.redirect("/"); //se debe hacer esto para prque solo se puede hacer un "res.render" entonces esto redirecciona a "app.get("/")"
    }

});

//GET Y POST PARA LA SECCION WORK
app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res) {

    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", function(req, res) {
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});