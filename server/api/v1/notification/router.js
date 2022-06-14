import express from "express";
import { uploadNotifiactionMiddleware } from "../../../middlewares/file-upload.js";
import controller from "./notification.controller.js";

const router = express.Router();

router.get('/', controller.getNotifications);
router.post('/', uploadNotifiactionMiddleware().single('file'), controller.saveNotification);

export default router;
