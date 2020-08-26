//jshint esversion:6

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//conexion url
const url = 'mongodb://localhost:27017';

//DB Name
const dbName = 'fruitsDB'; //Se crea una base de datos en donde se pueden almacenar todas las tablas necesarias

//New MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

//Conexion con el servidor
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    findDocuments(db, function() {
        client.close();
    });
});

const insertDocuments = function(db, callback) {
    //obtiene coleccion de documentos
    const collection = db.collection('fruits');
    collection.insertMany([
        {
            name: "Apple",
            score: 8,
            review: "Great fruit"
        }, 
        {
            name: "Orange",
            score: 6,
            review: "Kinda sour"
        }, 
        {
            name: "Banana",
            score: 9,
            review: "Great stuff!"
        }
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

const findDocuments = function(db, callback) {
    //obtenemos la coleccion de documentos
    const collection = db.collection('fruits');

    //para encontrar algunos documentos
    collection.find({}).toArray(function(err, fruits) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits);
        callback(fruits);
    });
}