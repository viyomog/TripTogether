const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Optional: for image messages
    },
    messageType: {
      type: String,
      enum: ["text", "call"],
      default: "text",
    },
    callStatus: {
      type: String, // missed, ended, rejected
    },
    callDuration: {
      type: String, // e.g. "5:02"
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
