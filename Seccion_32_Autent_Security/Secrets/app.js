//jshint esversion:6
require('dotenv').config(); //paquete usado para incrementar nivel de seguridad en cuanto a la proteccion de la llave de encriptacion
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session'); //complementos para mejorar el nivel de seguridad a partir de esta linea
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy; //complemento para mejorar nivel de seguridad
const findOrCreate = require('mongoose-findorcreate')

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize()); //inicializamos complemento passport
app.use(passport.session()); //inicializamos la session

//conexion con el servidor de mongoDB
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

//creacion de esquema para cada documento (conjunto de datos)
const userSchema = new mongoose.Schema ({ //esquema creado por medio de la clase "mongoose.Schema"
    email: String,
    password: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose); //usamos el complemento de passport-local-mongoose
userSchema.plugin(findOrCreate);

//creacion de modelo de tabla con base en el esquema (la cual mongoDB pluraliza posteriormente)
const User = new mongoose.model("User", userSchema);

//para evitar un warning que se genera al iniciar el servidor
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

//parte del codigo que se usa para mejorar nivel de seguridad
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo" //esto se pone para evitar un warning
  },
  function(accessToken, refreshToken, profile, cb) {

    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", function(req, res) {
    res.render("home");
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/secrets", 
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets
    res.redirect("/secrets");
  });

//VENTANA LOGIN
app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", function(req, res){

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    req.login(user, function(err){
        if(err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secrets");
            });
        }
    })

});


//VENTANA REGISTER
app.get("/register", function(req, res) {
    res.render("register");
});

app.get("/secrets", function(req, res){ 
   User.find({"secret": {$ne: null}}, function(err, foundUsers){
       if(err){
           console.log(err);
       } else {
           if(foundUsers) {
               res.render("secrets", {usersWithSecrets: foundUsers});
           }
       }
   }) //la condicion a preguntar para la busqueda, en este caso, es decir que si "secret" no es igual ($ne) a "null" encuentre documentos de esa manera
});

//VENTANA SUBMIT
app.get("/submit", function(req, res){
    if(req.isAuthenticated()){ //con esto verificamos si el usuario realmente ya ha iniciado sesion con su usuario o no
        res.render("submit");
    } else {
        res.redirect("/login");
    }
});

app.post("/submit", function(req, res){
    const submittedSecret = req.body.secret; //se accede al input cuyo "name" es "secret"

    console.log(req.user.id);

    User.findById(req.user.id, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            if(foundUser){
                foundUser.secret = submittedSecret;
                foundUser.save(function(){
                    res.redirect("/secrets");
                })
            }
        }
    });
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

app.post("/register", function(req, res) {

    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secrets");
            });
        }
    });

});




app.listen(3000, function() {
    console.log("Server started on port 3000.");
});
