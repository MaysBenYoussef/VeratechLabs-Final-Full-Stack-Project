const express = require("express");
const router = express.Router();

const Service = require("../models/Service");
const auth = require("../middleware/auth");

const role = require("../middleware/role");


router.get("/", async (req, res) => {
  try {
    const services = await Service.find();

    res.json(services);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post(
  "/",
  auth,
  role("admin"),
  async (req, res) => {
  try {
    const service = await Service.create({
      title: req.body.title,
      description: req.body.description,
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.put(
  "/:id",
  auth,
  role("admin"),
  async (req, res) => {
  try {
    const service =
      await Service.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
        },
        { new: true }
      );

    res.json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.delete(
  "/:id",
  auth,
  role("admin"),
  async (req, res) => {
  try {
    await Service.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;