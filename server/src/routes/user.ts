import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();
const userController: UserController = new UserController();

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.saveUser);
router.delete('/', userController.deleteUser);

export default router;

