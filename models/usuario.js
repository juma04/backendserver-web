var mongoose = require('mongoose');
var UniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

var usuarioSchema = new Schema({


    nombre: { type: String, required: [true, "El nombre es requerido"] },
    email: { type: String, unique: true, required: [true, "el correo es requerido"] },
    password: { type: String, required: [true, "La contrasena es necesaria"] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: "USER_ROLE", enum: rolesValidos }

});

usuarioSchema.plugin(UniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);