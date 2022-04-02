import express from 'express';
import { protect, admin } from '../middlewares/authMiddleware.js';
import {
  registerUser,
  getUserProfile,
  getUserById,
  authUser,
  getUsers,
  updateUserProfile,
  updateUser,
  deleteUser,
  resetPasswordRequestController,
  resetPasswordController,
} from '../controller/userController.js';

const router = express.Router();

// Public
router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.post("/auth/requestResetPassword", resetPasswordRequestController);
router.post("/auth/resetPassword", resetPasswordController);
 
//Protect
router.route('/profile').get(protect,getUserProfile);
router.route('/profile').put(protect, updateUserProfile);

//Admin
router.route('/').get(protect, admin, getUsers);
router.route('/:id').get(protect, admin, getUserById);
router.route('/:id').put(protect, admin, updateUser);
router.route('/:id').delete(protect, admin, deleteUser);

export default router;