import multer from "multer";

// store file temporarily in memory
const storage = multer.memoryStorage();

// multer middleware that reads file into memory buffer
const upload = multer({ storage });

export default upload;


