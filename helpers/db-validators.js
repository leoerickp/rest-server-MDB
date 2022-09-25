const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error('El Rol no está registrado en la base de datos');
    }
}

const emailExiste = async (correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error('El correo ya está registrado');
    }
}
const existeUsuarioById = async (id) => {
    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El Usuario con ${id} no está registrado`);
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioById,
}