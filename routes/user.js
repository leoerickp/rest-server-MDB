const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPut, usersPatch, userDelete, usersPost } = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioById } = require('../helpers/db-validators');

const router = Router();

router.get('/', usersGet);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('rol').custom(esRolValido),
    validarCampos
], usersPut);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido), // es lo mismo eso check('rol').custom(roll=esRolValido(rol)),
    validarCampos
], usersPost);
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], userDelete);
router.patch('/', usersPatch);


module.exports = router;