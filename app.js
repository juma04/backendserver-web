//require
var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//inicializar variables
var app = express();

//body parse

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//importar rutas
var usuarioRoutes = require('./routes/usuario');
var appRoutes = require('./routes/app');




//conexion a base de datos

mongoose.connection.openUri('mongodb://localhost:27017/catalogoweb', (err, res) => {

    if (err) throw err;
    console.log('Base de datos : \x1b[32m%s\x1b[0m', 'online');



});



//rutas

app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);



//escuchar peticiones
app.listen(3000, () => {
    console.log('Servidor Express en el puerto 3000 : \x1b[32m%s\x1b[0m', 'online');
});