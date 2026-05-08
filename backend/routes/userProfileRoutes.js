const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const admin = require("../socket/firebase");
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

router.get("/get-profiles-from-username", authMiddleware, async (req, res) => {
  try {
    const { username = "", page = 1, limit = 10 } = req.query;

    const loggedInUserId = req.user.id;

    const skip = (page - 1) * limit;

    const users = await User.find({
      username: { $regex: username, $options: "i" },
      _id: { $ne: loggedInUserId }, 
    })
      .select("username fullName profilePic followers") // Include followers to check follow status
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      users,
      page: Number(page),
      hasMore: users.length === Number(limit), 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   POST /api/user-profile/follow-user
 * @desc    Follow or Unfollow a user
 * @access  Private
 */
router.post("/follow-user", authMiddleware, async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const loggedInUserId = req.user.id;

    if (targetUserId === loggedInUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    // Find both users
    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(loggedInUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if already following
    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      // Unfollow logic
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUserId
      );
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== loggedInUserId
      );
    } else {
      // Follow logic
      currentUser.following.push(targetUserId);
      targetUser.followers.push(loggedInUserId);

      /* 
      // Send Push Notification
      if (targetUser.fcmToken) {
        const payload = {
          notification: {
            title: "New Follower!",
            body: `${currentUser.fullName} (@${currentUser.username}) started following you.`,
          },
          data: {
            type: "NEW_FOLLOWER",
            followerId: loggedInUserId,
          },
          token: targetUser.fcmToken,
        };

        try {
          await admin.messaging().send(payload);
          console.log("Follow push notification sent to:", targetUser.username);
        } catch (fcmError) {
          console.error("Error sending Follow FCM notification:", fcmError);
        }
      }
      */
    }

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      success: true,
      message: isFollowing ? "Unfollowed successfully" : "Followed successfully",
      isFollowing: !isFollowing,
    });
  } catch (error) {
    console.error("Follow error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/**
 * @route   GET /api/user-profile/get-followers
 * @desc    Get followers of the current user
 * @access  Private
 */
router.get("/get-followers", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "followers",
      "username fullName profilePic bio",
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, followers: user.followers });
  } catch (error) {
    console.error("Get followers error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * @route   GET /api/user-profile/get-followers/:username
 * @desc    Get followers of a specific user by username
 * @access  Private
 */
router.get("/get-followers/:username", authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).populate(
      "followers",
      "username fullName profilePic bio",
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, followers: user.followers });
  } catch (error) {
    console.error("Get followers error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * @route   GET /api/user-profile/get-following
 * @desc    Get following of the current user
 * @access  Private
 */
router.get("/get-following", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "following",
      "username fullName profilePic bio",
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, following: user.following });
  } catch (error) {
    console.error("Get following error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * @route   GET /api/user-profile/get-following/:username
 * @desc    Get following of a specific user by username
 * @access  Private
 */
router.get("/get-following/:username", authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).populate(
      "following",
      "username fullName profilePic bio",
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, following: user.following });
  } catch (error) {
    console.error("Get following error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * @route   GET /api/user-profile/get-user-profile/:username
 * @desc    Get any user's profile by username
 * @access  Private
 */
router.get("/get-user-profile/:username", authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");

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
    console.error("Get user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/**
 * @route   POST /api/user-profile/update-fcm-token
 * @desc    Update FCM token for the current user
 * @access  Private
 */
router.post("/update-fcm-token", authMiddleware, async (req, res) => {
  try {
    const { fcmToken } = req.body;
    if (!fcmToken) {
      return res.status(400).json({ success: false, message: "Token is required" });
    }

    await User.findByIdAndUpdate(req.user.id, { fcmToken });
    res.status(200).json({ success: true, message: "FCM token updated" });
  } catch (error) {
    console.error("Update FCM token error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
