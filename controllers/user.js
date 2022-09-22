
//No es necesario es redundante pero sirve para ayudarnos con las sugerencias
const { response } = require('express');

const usersGet = (req, res = response) => {
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    res.json({
        msg: 'get API - controller',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}
const usersPut = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: 'put API - controller',
        id
    });
}
const usersPost = (req, res) => {
    const { nombre, edad } = req.body;
    res.status(201).json({
        msg: 'post API - controller',
        nombre,
        edad,
    });
}
const userDelete = (req, res) => {
    res.json({
        msg: 'delete API - controller',
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