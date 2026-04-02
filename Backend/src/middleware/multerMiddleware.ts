import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = "./public/temp";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
