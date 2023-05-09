const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname);

  const acceptableExtensions = [
    ".jpg",
    ".png",
    ".docx",
    ".pdf",
    ".js",
    ".html",
    ".pptx",
    ".txt",
    ".zip",
  ];

  if (!acceptableExtensions.includes(ext)) {
    cb(new Error({ message: "File format not supported!" }));
    return;
  }
  cb(null, true);
};

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
});
