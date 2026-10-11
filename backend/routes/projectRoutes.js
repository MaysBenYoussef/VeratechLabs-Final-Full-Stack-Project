const express = require("express");
const router = express.Router();

const Project = require("../models/Project");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

/* CREATE PROJECT - ADMIN */

router.post(
  "/",
  auth,
  role("admin"),
  async (req, res) => {
    try {
      const newProject =
        await Project.create({
          projectName:
            req.body.projectName,

          description:
            req.body.description,

          status:
            req.body.status ||
            "Not Started",

          client:
            req.body.client,

          assignedMembers:
            req.body.assignedMembers ||
            [],
        });

      res
        .status(201)
        .json(newProject);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

/* GET PROJECTS */

router.get(
  "/",
  auth,
  async (req, res) => {
    try {

      let projects;

      if (
        req.user.role ===
        "admin"
      ) {
        projects =
          await Project.find()
            .populate("client")
            .populate(
              "assignedMembers"
            );
      } else {
        projects =
          await Project.find({
            assignedMembers:
              req.user.id,
          })
            .populate("client")
            .populate(
              "assignedMembers"
            );
      }

      res.status(200).json(
        projects
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

/* UPDATE PROJECT */

router.put(
  "/:id",
  auth,
  role("admin", "employee"),
  async (req, res) => {
    try {
      const project =
        await Project.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(project);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

/* DELETE PROJECT - ADMIN */

router.delete(
  "/:id",
  auth,
  role("admin"),
  async (req, res) => {
    try {
      await Project.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Project deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;