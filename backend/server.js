const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contactRoutes = require("./routes/contactRoutes");
const contentRoutes = require("./routes/contentRoutes");

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

const userRoutes = require("./routes/userRoutes");

const serviceManagement =
  require("./routes/serviceManagement");

const requestRoutes =
  require("./routes/requestRoutes");

const documentRoutes =
  require("./routes/documentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static("uploads")
);

app.use("/api/contact", contactRoutes);
app.use("/api/content", contentRoutes);

app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);

app.use("/api/user", userRoutes);

app.use(
  "/api/services",
  serviceManagement
);

app.use(
  "/api/requests",
  requestRoutes
);

app.use(
  "/api/documents",
  documentRoutes
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});

const clientRoutes =
  require("./routes/clientRoutes");
    app.use(
  "/api/clients",
  clientRoutes
);


const projectRoutes =
  require("./routes/projectRoutes");

app.use(
  "/api/projects",
  projectRoutes
);