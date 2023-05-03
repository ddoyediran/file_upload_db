const router = require("express").Router();
const cloudinary = require("../cloudinary");
const upload = require("../multer");
const User = require("../user");

router.post("/", upload.single("submitted_file"), async (req, res, next) => {
  try {
    // upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // create new user
    const user = new User({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });

    // Save user to database
    await user.save();

    res.status(201).json({ user });
  } catch (err) {
    next(err.message);
  }
});

// Get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});

    res.status(200).json({ users });
  } catch (err) {
    next(err.message);
  }
});

// Get one user
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({ user });
  } catch (err) {
    next(err.message);
  }
});

// delete the user and image from cloudinary
router.delete("/:id", async (req, res, next) => {
  try {
    // Find the user by id
    const user = await User.findById(req.params.id);

    // Delete image from cloudinary
    const removed = await cloudinary.uploader.destroy(user.cloudinary_id);
    console.log(removed);

    // Delete User from the db
    const userRemoved = await user.deleteOne({ _id: user._id });

    res.status(200).json({ user: userRemoved });
  } catch (err) {
    next(err.message);
  }
});

// Update the image in cloudinary
router.put("/:id", upload.single("submitted_field"), async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    // Delete the image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);

    // Upload a new image
    const result = await cloudinary.uploader.upload(req.file.path);

    const data = {
      name: req.body.name || user.name,
      avatar: result.secure_url || user.avatar,
      cloudinary_id: result.public_id || user.cloudinary_id,
    };

    const userUpdated = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    res.status(201).json({ user: userUpdated });
  } catch (err) {
    next(err.message);
  }
});

module.exports = router;
