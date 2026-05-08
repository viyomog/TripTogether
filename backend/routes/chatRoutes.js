const express = require("express");
const { getMessages, sendMessage, saveCallLog } = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:id", authMiddleware, getMessages);
router.post("/send/:id", authMiddleware, sendMessage);
router.post("/call-log/:id", authMiddleware, saveCallLog);

module.exports = router;
