import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

const url = "http://localhost:8000";

let gfsBucket;
mongoose.connection.once("open", () => {
  gfsBucket = new GridFSBucket(mongoose.connection.db, { bucketName: "photos" });
  console.log("✅ GridFSBucket initialized: photos");
});

// Upload image manually to GridFS
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    if (!gfsBucket) {
      return res.status(500).json({ msg: "GridFS not initialized yet" });
    }

    // Use original name with timestamp
    const filename = `${Date.now()}-${req.file.originalname}`;
    const uploadStream = gfsBucket.openUploadStream(filename, {
      contentType: req.file.mimetype,
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", () => {
      const imageUrl = `${url}/file/${filename}`;
      console.log("✅ Uploaded:", imageUrl);
      return res.status(200).json(imageUrl); // return the URL directly
    });

    uploadStream.on("error", (err) => {
      console.error("Upload error:", err);
      res.status(500).json({ msg: "Error uploading file" });
    });
  } catch (error) {
    console.error("Unexpected upload error:", error);
    res.status(500).json({ msg: error.message });
  }
};

// Retrieve image
export const getImage = async (req, res) => {
  try {
    if (!gfsBucket) return res.status(500).json({ msg: "GridFS not ready" });

    const fileStream = gfsBucket.openDownloadStreamByName(req.params.filename);

    fileStream.on("error", (err) => {
      console.error("File read error:", err);
      return res.status(404).json({ msg: "File not found" });
    });

    res.set("Content-Type", "image/jpeg"); // helps frontend render correctly
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// import mongoose from "mongoose";
// import { GridFSBucket } from "mongodb";

// const url = "http://localhost:8000";

// let gfsBucket;
// mongoose.connection.once("open", () => {
//   gfsBucket = new GridFSBucket(mongoose.connection.db, { bucketName: "photos" });
//   console.log("✅ GridFSBucket initialized: photos");
// });

// // Upload image manually to GridFS
// export const uploadImage = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ msg: "No file uploaded" });
//     if (!gfsBucket) return res.status(500).json({ msg: "GridFS not initialized yet" });

//     const filename = `${Date.now()}-${req.file.originalname}`;
//     const uploadStream = gfsBucket.openUploadStream(filename, {
//       contentType: req.file.mimetype,
//     });

//     uploadStream.end(req.file.buffer);

//     uploadStream.on("finish", () => {
//       const imageUrl = `${url}/file/${filename}`;
//       return res.status(200).json({ imageUrl });
//     });

//     uploadStream.on("error", (err) => {
//       console.error("Upload error:", err);
//       res.status(500).json({ msg: "Error uploading file" });
//     });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // Retrieve image
// export const getImage = async (req, res) => {
//   try {
//     if (!gfsBucket) return res.status(500).json({ msg: "GridFS not ready" });

//     const fileStream = gfsBucket.openDownloadStreamByName(req.params.filename);
//     fileStream.on("error", () => res.status(404).json({ msg: "File not found" }));
//     fileStream.pipe(res);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };
