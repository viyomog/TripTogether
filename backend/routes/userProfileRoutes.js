const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/get-my-profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

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

router.post("/edit-profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const { bio, fullName, age, gender } = req.body;

    const updateData = {};

    if (bio !== undefined) updateData.bio = bio;
    if (fullName !== undefined) updateData.fullName = fullName;
    if (age !== undefined) updateData.age = age;
    if (gender !== undefined) updateData.gender = gender;

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Edit profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.post("/add-interests", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const { travelStyles, travelInterests } = req.body;

    const updateData = {};

    if (travelStyles) updateData.travelStyles = travelStyles;
    if (travelInterests) updateData.travelInterests = travelInterests;

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Edit profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
