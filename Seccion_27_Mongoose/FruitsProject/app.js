//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true }); //con lo de los {} corregimos los warnings que aparecen al iniciar el servidor

//Creamos el esquema que es en donde se indican los elementos que va a tener nuestra tabla
const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name especified!"] //Este es un tipo de validacion, en donde se asegura de que cada dato tenga nombre para que pueda ser almacenado
    },
    rating: {
      type: Number,
      min: 1,
      nax: 10 //esta es otra validacion en donde delimitamos el valor a ingresar, el cual debe ser entre 1 y 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema); //con esto indicamos cual es el modelo de obejtos a crear (la tabla), en donde se tiene en cuenta el esquema puesto anteriormente
//esta tabla posteriormente se pluraliza por mongoose, colocando como nombre de la tabla "fruits"

//añadimos un dato a nuestra tabla (CREATE)
const fruit = new Fruit ({
    rating: 10,
    review: "Peaches are so yummy!"
});

//fruit.save();

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema); //En este caso "Person" lo pluraliza mongoose, quedando como titulo de la tabla "people"

const pineapple = new Fruit({
    name: "Pineapple",
    score: 9,
    review: "Great fruit."
});

pineapple.save();

const person = new Person ({
    name: "Amy",
    age: 12,
    favouriteFruit: pineapple
});

person.save();

/*Fruit.insertMany([kiwi, orange, banana], function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Succesfully saver all the fruits to fruitsDB");
    }
});*/

//funcion encontrar frutas (READ)
Fruit.find(function(err, fruits) {
    if(err) {
        console.log(err);
    } else {

        mongoose.connection.close(); //finalizar la conexion con el servidor de mongoose despues de hacer todo el proceso

        fruits.forEach(function(fruit) {
            console.log(fruit.name);
        });
    }
});

//Esta es la estructura de la funcion para actualizar datos (UPDATE)
/*Fruit.updateOne({_id: "5f44eb1bdd10c52a70119c27"}, {name: "Peach"}, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Succesfully updated the document.");
    }
});*/

//Esta es la estructura de la funcion para eliminar un conjunto de datos (DELETE)
/*Fruit.deleteOne({name: "Peach"}, function(err) {
    if(err){
        console.log(err);
    } else {
        console.log("Succesfuly deleted the document");
    }
});*/

/*Person.deleteMany({name: "John"}, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Succesfuly deleted all the documents");
    }
});*/


