const express = require("express");
const mongoose = require("mongoose");
const imgSchema = require("./model");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const multer = require("multer");
const cloudinary = require("./cloudinary");
const upload = require("./multer");
const { url } = require("inspector");
const userRouter = require("./routes/user");

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);

// connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.error(err.message);
  });

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

//const upload = multer({ storage: storage });

// GET image from the database
app.get("/", async (req, res) => {
  try {
    const image = await imgSchema.find({});

    if (!image) {
      return res.status(404).json({ message: "Not found!" });
    }

    res.render("imagepage", { items: image });
  } catch (err) {
    console.error(err.message);
  }
});

// POST image to database
app.post("/", upload.single("image"), async (req, res, next) => {
  try {
    const obj = {
      name: req.body.name,
      desc: req.body.desc,
      img: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      },
    };

    const uploadImage = await imgSchema.create(obj);

    if (!uploadImage) {
      res.status(404).json({ message: "File not upload!" });
    }

    res.redirect("/");
  } catch (err) {
    console.error(err.message);
  }
});

app.post(
  "/upload-images",
  upload.array("submitted_file", async (req, res) => {
    try {
      const uploader = async (path) => {
        return await cloudinary.uploads(path, "Files");
      };

      const urls = [];
      const files = req.files;

      for (let file of files) {
        let { path } = file;
        let newPath = await uploader(path);

        urls.push(newPath);
        fs.unlinkSync(path);
      }

      res.status(201).json({ data: urls });
    } catch (err) {
      console.error(err.message);
    }
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
