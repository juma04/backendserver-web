var express = require("express");
//var mongoose = require('mongoose');



//iniciar variables
var app = express();







//importar rutas


var usuarioRoutes = require('../routes/usuario');
//var loginRoutes = require('./routes/login');


//coneccion a base de datos

//mongoose.connection.openUri('mongodb://localhost:27017/catalogoweb')


app.get('/', (req, res, next) => {


    res.status(200).json({
        ok: true,
        mensaje: 'peticion realiada correctamente'
    });
});

module.exports = app;