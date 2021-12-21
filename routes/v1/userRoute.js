const express = require('express');

const authController = require('./../../controllers/v1/authController');
const userController = require('./../../controllers/v1/userController');

const router = express.Router();

// AUTH ROUTES
router.post('/signup', authController.signup);

// USER ROUTES
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
