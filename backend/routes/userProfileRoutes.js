const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/get-my-profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
