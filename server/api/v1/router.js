import { Router } from "express";
import file from './files/router.js';
import notification from './notification/router.js';
const router = Router();

router.use('/file', file);
router.use('/notification', notification);

export default router;