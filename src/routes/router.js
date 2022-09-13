const express = require('express');
const Controller = require('../controllers/controller');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/', Controller.helloWorld);
router.post('/register', UserController.register);
router.get('/getUsers', UserController.getUsers);
router.get('/getUsers/:id', UserController.getUserById);
router.put('/update/:id', UserController.update);
router.delete('/delete/:id', UserController.delete);

module.exports = router;
