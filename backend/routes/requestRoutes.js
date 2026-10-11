const express = require("express");
const router = express.Router();

const Request = require("../models/Request");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

/* CUSTOMER CREATED REQUEST */
router.post("/", async (req, res) => {
  try {
    const request = await Request.create({
      customerName: req.body.customerName,
      email: req.body.email,
      service: req.body.service,
      message: req.body.message,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* ADMIN + EMPLOYEE */
router.get(
  "/",
  auth,
  role("admin", "employee"),
  async (req, res) => {
    try {
      const { search, status } = req.query;

      let query = {};

      if (search) {
        query.$or = [
          {
            customerName: {
              $regex: search,
              $options: "i",
            },
          },
          {
            email: {
              $regex: search,
              $options: "i",
            },
          },
          {
            service: {
              $regex: search,
              $options: "i",
            },
          },
        ];
      }

      if (
        status &&
        status !== "All"
      ) {
        query.status = status;
      }

      const requests =
        await Request.find(query);

      res.json(requests);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* ADMIN + EMPLOYEE */
router.put(
  "/:id",
  auth,
  role("admin", "employee"),
  async (req, res) => {
    try {
      const request =
        await Request.findByIdAndUpdate(
          req.params.id,
          {
            status: req.body.status,
          },
          {
            new: true,
          }
        );

      res.json(request);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  
);

module.exports = router;