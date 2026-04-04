const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 300,
    },
    age: Number,
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    location: {
      city: String,
      country: String,
    },
    travelInterests: [
      {
        type: String,
      },
    ],
    travelStyles: [
      {
        type: String,
      },
    ],
    profilePic: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.A7RVNHuWKQ4LCnXBU5tCTwHaHa?w=215&h=215&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
