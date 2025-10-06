import express from 'express';
import RoleController from '../controllers/RoleController';

const router = express.Router();
const roleController: RoleController = new RoleController();

router.get('/', roleController.getAllRoles);
router.get('/:roleId', roleController.getRoleById);
router.post('/', roleController.saveRole);
router.delete('/', roleController.deleteRole);

export default router;

