import express from "express";
import { uploadMiddleware } from "../../../middlewares/file-upload.js";
import controller from "./files.controller.js";

const router = express.Router();

router.get('/', controller.getFilesList);
router.get('/filter', controller.filterFilesList);
router.get('/last_excel_files', controller.listlastFiles);
router.post('/', uploadMiddleware().single('file'), controller.uploadFile);

export default router;
