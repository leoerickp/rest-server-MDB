const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/login', [
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password es requerido').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'Id_Token de google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;