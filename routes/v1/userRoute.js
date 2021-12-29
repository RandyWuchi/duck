const express = require('express');

const authController = require('./../../controllers/v1/authController');
const userController = require('./../../controllers/v1/userController');

const router = express.Router();

// AUTH ROUTES
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router.patch(
  '/update-my-password',
  authController.protect,
  authController.updatePassword
);

router.patch('/update-me', authController.protect, userController.updateMe);
router.delete('/delete-me', authController.protect, userController.deleteMe);

// USER ROUTES
router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
