const { response } = require('express');

const esAdminRole = (req, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'No se cuenta con un token validado para validar el usuario',
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`,
        })
    }
    next();
}

const tieneRole = (...roles) => {

    return (req, res = response, next) => {

        //Recibo roles como un arreglo
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'No se cuenta con un token validado para validar el usuario',
            });
        }
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`,
            })
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}