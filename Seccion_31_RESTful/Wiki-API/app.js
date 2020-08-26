//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//acceso al servidor mongodb
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

//creamos el esquema del conjunto de datos
const articleSchema = {
    title: String,
    content: String
};

//creamos el modelo de la nueva tabla
const Article = mongoose.model("Article", articleSchema);

////////////////////////////////////////Recuests Targetting all Articles///////////////////////////////////

//juntamos get, post y delete de la siguiente manera
app.route("/articles")

//imprimimos todos los elementos añadidos a nuestra coleccion
.get(function(req, res) {
    Article.find(function(err, foundArticles) {
        if(!err) {
            res.send(foundArticles);
        } else {
            res.send(err);
        }
        
    });
})

//recibimos informacion del cliente, la almacenamos y enviamos respuesta de proceso satisfactorio
.post(function(req, res) {

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err) {
        if(!err) {
            res.send("Successfuly added a new article.");
        } else {
            res.send(err);
        }
    });
})

//borramos todo el contenido de la coleccion y enviamos respuesta de proceso satisfactorio
.delete(function(req, res) {
    Article.deleteMany(function(err) {
        if(!err) {
            res.send("Successfully deleted all articles.");
        } else {
            res.send(err);
        }
    });
});

////////////////////////////////////////Recuests Targetting a Specific Articles///////////////////////////////////

app.route("/articles/:articleTitle")

.get(function(req,res){
    //buscamos un documento que tenga el mismo titulo que el que es recibido por el cliente
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
        if(foundArticle) {
            res.send(foundArticle);
        } else {
            res.send("No articles matching that title was found.");
        }
    });
})

//Actualizamos un dato especifico del documento (conjunto de datos) aunque si usamos put aunque sea un dato especifico
//se actualiza todo el documento, en este caso, si solo se actualiza content y no se pone nada en "title", dicho elemento
//sera borrado y el nuevo documento unicamente tendra "content"
.put(function(req, res) {
    Article.update (
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
        function(err) {
            if(!err) {
                res.send("Successfully updated article.");
            }
        }
    );
})

//Actualizamos un dato especifico del documento (conjunto de datos) pero esto no altera los demas datos
.patch(function(req, res){
    Article.update(
        {title: req.params.articleTitle},
        {$set: req.body}, //ese $set significa que se realiza actualizacion UNICAMENTE al elemento modificado 
        function(err) {
            if(!err) {
                res.send("Successfully update article.");
            } else {
                res.send(err);
            }
        }
    );
})

//Borramos un eelemento del documento
.delete(function(req, res){
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
            if(!err){
                res.send("Successfuly deleted the corresponding article.");
            } else {
                res.send(err);
            }
        }
    );
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});