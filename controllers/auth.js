const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response) => {
    const { correo, password } = req.body;
    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo',
            });
        }

        // Verificar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado:false',
            });
        }

        // Verficar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password',
            });
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contáctese con el administrador',
        });
    };
}

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            //Tengo que crear el usuario
            const data = {
                nombre,
                correo,
                password: ':P', //Cualquier cosa porque la validación viene de google
                img,
                google: true,
            };

            usuario = new Usuario(data);
            await usuario.save();
        }
        // Si el usuario en DB
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario bloqueado, hable con el administrador'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        })
    }


}

module.exports = {
    login,
    googleSignIn,
}