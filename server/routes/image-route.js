import express from "express";
import upload from "../utils/upload.js";
import { uploadImage, getImage } from "../controller/image-controller.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadImage);
router.get("/:filename", getImage);

export default router;


// import express from 'express';
// import multer from 'multer';
// import { uploadImage } from '../controller/image-controller.js';

// const router = express.Router();

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // folder must exist
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// // Upload route
// router.post('/upload', upload.single('file'), uploadImage);

// export default router;
