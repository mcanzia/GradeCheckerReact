import express from 'express';
import GroupController from '../controllers/GroupController';

const router = express.Router();
const groupController: GroupController = new GroupController();

router.get('/', groupController.getAllGroups);
router.get('/:groupId', groupController.getGroupById);
router.post('/', groupController.saveGroup);
router.delete('/', groupController.deleteGroup);

export default router;

