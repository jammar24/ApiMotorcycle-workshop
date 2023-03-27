const express = require('express');

const userController = require('../controllers/users.controller');

const routerUser = express.Router();

routerUser
  .route('/')
  .get(userController.findAll)
  .post(userController.createUser);

routerUser
  .route('/:id')
  .get(userController.userById)
  .patch(userController.upDateUser)
  .delete(userController.deleteUser);

module.exports = routerUser;
