const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const User = require("../models/User");

const role = require("../middleware/role");

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(
      req.user.id
    ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/profile", auth, async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser =
      await User.findByIdAndUpdate(
        req.user.id,
        {
          name,
          email,
        },
        { new: true }
      ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.get(
  "/",
  auth,
  role("admin"),
  async (req, res) => {
    try {
      const users =
        await User.find().select(
          "-password"
        );

      res.json(users);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;