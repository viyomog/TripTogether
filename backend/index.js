const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const bodyParser = require("body-parser");

const authRoutes = require('./routes/authRoutes');

const app = express();
dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
    methods: ["POST", "PUT", "GET", "DELETE"],
  }),
);

mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "TripTogether",
  })
  .then(() => {
    console.log("Database connected".yellow.bold);
  })
  .catch((err) => {
  console.error("MongoDB connection error:", err);
});

const PORT = process.env.PORT || 5000;

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend is running" });
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.blue);
});
