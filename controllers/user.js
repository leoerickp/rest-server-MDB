
//No es necesario es redundante pero sirve para ayudarnos con las sugerencias
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { existeUsuarioById } = require('../helpers/db-validators');


const usersGet = async (req, res = response) => {
    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    /*const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments(query);*/

    /*const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);*/

    res.json({
        /*total,
        usuarios*/
        msg: "todo bien",
    });
}
const usersPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    //TODO validad contra base de datos

    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); // 10 vueltas por defecto
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}
const usersPost = async (req, res) => {



    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); // 10 vueltas por defecto
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();

    res.status(201).json({
        msg: 'post API - controller',
        usuario,
    });
}
const userDelete = async (req, res) => {
    const { id } = req.params;
    //Fisicamente borrado
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    res.json({
        usuario
    });
}
const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API  - controller',
    });
}
module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersPatch,
    userDelete,
}