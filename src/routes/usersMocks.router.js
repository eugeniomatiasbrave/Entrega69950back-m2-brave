import usersMocksController from '../controllers/usersMocks.controller.js';
import {Router} from 'express';

const router = Router();

router.post('/generateData', usersMocksController.createUser);
router.get('/mockingusers', usersMocksController.getUsers);


export default router;