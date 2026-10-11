const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

router.get(
  "/dashboard",
  auth,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Bienvenue sur le dashboard",
      user: req.user
    });
  }
);

module.exports = router;