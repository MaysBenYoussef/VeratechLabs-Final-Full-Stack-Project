const express = require("express");

const router = express.Router();

const Content = require("../models/Content");

router.get("/", async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching content",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { section, title, description } = req.body;

    if (!section || !title || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const content = await Content.create({
      section,
      title,
      description,
    });

    res.status(201).json(content);
  } catch (error) {
    res.status(400).json({
      message: "Unable to create content",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!content) {
      return res.status(404).json({
        message: "Content not found",
      });
    }

    res.json(content);
  } catch (error) {
    res.status(400).json({
      message: "Unable to update content",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);

    if (!content) {
      return res.status(404).json({
        message: "Content not found",
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to delete content",
    });
  }
});

module.exports = router;