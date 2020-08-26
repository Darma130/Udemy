//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash"); //debemos instalar este complemento para poder usar la funcion "_.lowercase" (usando npm i lodash)

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = []; //se crea este arreglo con el que manipulamos la cantidad de publicaciones que hace el usuario,
//se almacenan aqui cuando sean recibidas por el ap.post("/compose")

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent}); //el primer "aboutContent" es la variable que se pone en el archivo "about.ejs" y el segundo es el que se encuentra en este archivo, en donde se almacena el texto a publicar
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent}); //en este caso pasa lo mismo que con el archivo "about"
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = { //se crea este objeto para manipular los 2 datos entregados por el usuario
    title: req.body.postTitle, //se obtiene el dato escrito por el usuario en el primer input de la seccion "compose"
    content: req.body.postBody //se obtiene el dato escrito por el usuario en el segundo input (cuadro de texto)
  };

  posts.push(post);

  res.redirect("/"); //redireccionamos para que la informacion a publicar se coloque en la pagina principal "home"

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName); //cuando se manejan parametros o enrutamos dinamicamente
  //con lo que coloca el usuario, este dato se oobtiene desde req.params.postName
  //con _.lowerCase hacemos que el texto insertado ignore los - se ignoren y se cambien por espacios, es util para comparar palabras que tienen espacios

  posts.forEach(function(post){ //hacemos el mismo procedimiento para cada elemento del arreglo de objetos "posts"
    const storedTitle = _.lowerCase(post.title); //Almacenamos el titulo de la publicacion puesto por el usuario (ignorando los - y reemplazandolos con espacio)

    if (storedTitle === requestedTitle) { //Comparamos si el titulo de la publicacion es igual a la ruta dinamica que va a asignar el usuario para la publicacion
      res.render("post", { //generamos la nueva ruta dinamica asignada por el usuario (usando el archivo "post") con el dato del titulo del post y el grueso de la publicacion
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
