var express = require("express");
var app = express();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


Usuario = require("../models/usuario");

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioBD) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar usuarios',

                Errors: err
            });
        }


        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas -mail',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioBD.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas -password',
                errors: err
            });
        }


        //crear un token!!
        var token = jwt.sign({ usuario: usuarioBD }, '*esta/es/la-semilla-dificil', { expiresIn: 14400 }) //4 hras



        res.status(200).json({
            ok: true,
            usuario: usuarioBD,
            token: token,
            id: usuarioBD.id

        });

    })




});

















module.exports = app;