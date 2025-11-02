import multer from "multer";

// store file temporarily in memory
const storage = multer.memoryStorage();

// multer middleware that reads file into memory buffer
const upload = multer({ storage });

export default upload;



// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import dotenv from 'dotenv';

// dotenv.config();

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;

// const storage = new GridFsStorage({
//     url: process.env.MONGODB_URL,//`mongodb+srv://${username}:${password}@blog-app.cy9vr3n.mongodb.net/?appName=Blog-app`,
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (request, file) => {
//         const match = ["image/png", "image/jpg"];

//         if (match.indexOf(file.mimeType) === -1){
//             return `${Date.now()}-blog-${file.originalname}`;
//         }

//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-blog-${file.originalname}`
//         };
//     }
// });

// export default multer({ storage });
