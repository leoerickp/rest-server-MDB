const { Router } = require('express');
const { usersGet, usersPut, usersPatch, userDelete, usersPost } = require('../controllers/user');

const router = Router();

router.get('/', usersGet);
router.put('/:id', usersPut);
router.post('/', usersPost);
router.delete('/', userDelete);
router.patch('/', usersPatch);


module.exports = router;