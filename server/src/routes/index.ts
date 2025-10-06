import express from 'express';
import userRoutes from './user';
import groupRoutes from './group';
import roleRoutes from './role';

const router = express.Router();

router.use(express.json());

router.use('/users', userRoutes);
router.use('/groups', groupRoutes);
router.use('/roles', roleRoutes);

export default router;


