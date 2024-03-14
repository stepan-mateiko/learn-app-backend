import multer from "multer";
import fs from "fs";

const handleFileUpload = (app, port) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = "./uploads";
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage });

  app.post("/upload", upload.single("file"), (req, res) => {
    const filePath = req.file.path;
    const fileUrl = `http://localhost:${port}/${filePath}`;

    console.log("File uploaded:", fileUrl);
    res.send("File uploaded successfully");
  });
};

export { handleFileUpload };
