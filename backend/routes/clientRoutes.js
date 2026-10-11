const express = require("express");
const router = express.Router();

const Client = require("../models/Client");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

/* GET ALL CLIENTS */

router.get(
  "/",
  auth,
  async (req, res) => {
    try {
      const clients =
        await Client.find();

      res.json(clients);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* CREATE CLIENT */

router.post(
  "/",
  auth,
  role("admin"),
  async (req, res) => {
    try {
      const client =
        await Client.create({
          companyName:
            req.body.companyName,

          contactPerson:
            req.body.contactPerson,

          email:
            req.body.email,

          phone:
            req.body.phone,
        });

      res.status(201).json(
        client
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* UPDATE CLIENT */

router.put(
  "/:id",
  auth,
  role("admin"),
  async (req, res) => {
    try {
      const client =
        await Client.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(client);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* DELETE CLIENT */

router.delete(
  "/:id",
  auth,
  role("admin"),
  async (req, res) => {
    try {
      await Client.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Client deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;