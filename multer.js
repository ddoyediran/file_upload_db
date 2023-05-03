const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

// Acceptable file extensions
// const fileFilter = (req, file, cb) => {
//   const acceptableExtensions = [
//     ".jpg",
//     ".png",
//     ".docx",
//     ".pdf",
//     ".js",
//     ".html",
//     ".pptx",
//     ".txt",
//     ".zip",
//   ];

//   if (!acceptableExtensions.includes(path.extname(file.originalname))) {
//     return cb(new Error({ message: "File not supported!" }));
//   }
//   cb(null, true);
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1048576, // 10 Mb
//   },
//   fileFilter: fileFilter,
// });

// module.exports = upload;

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
