//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//creacion de la base de datos enlazada a la nube de mongoDB(añadir esos componentes que estan en true para evitar warnings)
mongoose.connect("mongodb+srv://admin-darmael:darmael12052332@cluster0.gu5sj.mongodb.net/test?retryWrites=true&w=majority/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

//creacion del esquema de cada conjunto de datos
const itemsSchema = {
  name: String
};

//creamos el primer modelo para la tabla de datos "Item" que mongoose la pluralice como "items"
const Item = mongoose.model("Item", itemsSchema); 

//añadimos 3 conjuntos de datos
const item1 = new Item({
  name: "Welcome to your todolist"
});

const item2 = new Item({
  name: "Hit the + button to add a new item"
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

//se concatenan todos los datos en un arreglo de objetos
const defaultItems = [item1, item2, item3];

//Creamos un esquema de conjunto de datos para la tabla "lists"
const listSchema = {
  name: String,
  items: [itemsSchema]
};

//Se crea el modelo de la tabla "lists" con su respectivo esquema de conjuntos de datos "listSchema"
const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems) {

    //con este if solucionamos el problema de que se ejecute .insertMany más de una vez y se ingresen los mismos datos
    //a la tabla varias veces, porque solo va a llenar datos una unica vez, cuando la tabla esté vacia
    if(foundItems.length === 0) {
       //no olvidar que con "insertMany" se pueden insertar varios conjuntos de datos, en este caso se añade "defaultItems" 
        //que es el arreglo de objetos que contienen todos los datos a almacenar en la tabla
      Item.insertMany(defaultItems, function(err) { 
        if(err) {
          console.log(err);
        } else {
          console.log("Successfully saved  items to DB.");
        }
      });
      res.redirect("/"); //se hace redirect para que vuelva a entrar a este app.get y pueda llegar a res.render, con la informacion ya obtenida
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems}); //En foundItems se obtienen los conjuntos de
      //datos almacenados en la tabla "items"
    }
    
  });

});

//Asi generamos dinamicamente una ruta que puede ser escrita por el usuario
app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName); //con _.capitalize hacemos que el texto tenga unicamente la primera letra en mayuscula

  //Esto se hace para verificar si existe un conjunto de datos o no
  List.findOne({name: customListName}, function(err, foundList) {
    if(!err) {
      if (!foundList) {
        //Creamos una nueva lista
        //creamos la nueva lista en donde incluimos el nombre (name) de la ruta generada dinamicamente por el usuario
        //y añadimos el conjunto de los datos (defaultItems) que fueron agregados previamente
        const list = new List({
          name: customListName,
          items: defaultItems
        });

        list.save(); //guardamos dicha lista en el servidor de mongo
        res.redirect("/" + customListName);
      } else {
        //muestra la lista existente
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });

 


});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list; //obtenemos informacion del boton


  //creamos un nuevo "document" o conjunto de datos
  const item = new Item({ 
    name: itemName
  });

  if(listName === "Today") {
    item.save(); //guardamos ese nuevo conjunto de datos
    res.redirect("/"); //redireccionamos a app.get("/") para que desde alli se publique el nuevo dato en la ventana de la pagina
  } else {
    List.findOne({name: listName}, function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }

  

});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err) { //con esta funcion buscamos un elemento que sea de la tabla, e impresa previamente para borrarla
      if(!err) {
        console.log("Successfully deleted checked item");
        res.redirect("/"); //redirigimos la pagina a home ("/") para que se aplique el respectivo cambio al sitio web
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}} }, function (err, foundList) {
      if(!err) {
        res.redirect("/" + listName);
      }

    }); //primer parametro, lo que se va a actualizar, segundo parametro, proceso a realizar en la actualizacion, tercero, funcion callback

  }

});



app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfuly.");
});
