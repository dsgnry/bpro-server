import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

export function uploadMiddleware() {
    const fileStorageEngine = multer.diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
          const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`)
      }
  });
  return multer({ storage: fileStorageEngine });
}

export function uploadNotifiactionMiddleware() {
    const fileStorageEngine = multer.diskStorage({
      destination: './notifications',
      filename: (req, file, cb) => {
          const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`)
      }
  });
  return multer({ storage: fileStorageEngine });
}
