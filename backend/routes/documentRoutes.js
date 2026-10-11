const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const Document = require("../models/Document");

router.post(
  "/upload",
  auth,
  upload.single("document"),
  async (req, res) => {
    try {

      console.log("UPLOAD ROUTE HIT");
      console.log("USER =", req.user);
      console.log("FILE =", req.file);

      const document = await Document.create({
        userId: req.user.id,
        originalName: req.file.originalname,
        fileName: req.file.filename,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
      });

      res.status(201).json(document);

    } catch (error) {

      console.log("UPLOAD ERROR:");
      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  }
);
router.get(
  "/",
  auth,
  async (req, res) => {
    try {
      const documents =
        await Document.find({
          userId: req.user.id,
        });

      res.json(documents);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

router.delete(
  "/:id",
  auth,
  async (req, res) => {
    try {
      await Document.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Document deleted",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

router.post("/test-upload", (req, res) => {
  console.log("TEST UPLOAD ROUTE HIT");

  res.json({
    message: "upload route works",
  });
});

module.exports = router;