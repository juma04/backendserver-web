var express = require("express");
var bcrypt = require('bcryptjs');
var app = express();

var Usuario = require('../models/usuario');




//==============================================
//obtener todos los usurios
//==============================================

app.get('/', (req, res, next) => {
    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {




                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error cargando usuario',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });





            });


});









//==============================================
//Crear un nuevo usuario
//==============================================
app.post('/', (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role

    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al actualziaa usuarios',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });

    })



});







//==============================================
//actualizar  usuario
//==============================================



app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar usuarios',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el usuario con el id ' + id + ' no existe',
                errors: err
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioguardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualziaa usuarios',
                    errors: err
                });
            }

            usuarioguardado.password = ':)';
            res.status(200).json({
                ok: true,
                usuario: usuarioguardado
            });

        });



    });


});








//==============================================
//elinimnar  usuario
//==============================================



app.delete('/:id', (req, res) => {

    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrar usuario',
                errors: err
            });
        }


        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                errors: { message: 'No exoste ningun usuario con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    })

});







module.exports = app;