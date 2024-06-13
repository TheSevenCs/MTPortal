// MESSAGES PAGE
const express = require("express");
const chatModule = require("../DataAccess/chatDA");
const router = express.Router();

router.post("/", async (req, res) => {
  const { messageAvatar, messageUsername, messageDate, messageContent } =
    req.query;
  try {
    await chatModule.addMessage(
      messageAvatar,
      messageUsername,
      messageDate,
      messageContent
    );
    console.log("FROM route.js, NEW Message ADDED.");
  } catch (error) {
    console.error("FROM route.js, ERROR ADDING Message: ", error);
  }
});
router.patch("/", async (req, res) => {
  const { message_id, editedMessage } = req.query;
  try {
    await chatModule.editMessage(message_id, editedMessage);
    console.error("FROM route.js, Message EDITED.");
  } catch (error) {
    console.error("FROM route.js, ERROR EDITING Message: ", error);
  }
});
router.get("/", async (req, res) => {
  try {
    const messages = await chatModule.getMessages();
    const formattedMessages = messages.map((message) => {
      return {
        messageAvatar: message.messageAvatar,
        messageUsername: message.messageUsername,
        messageDate: message.messageUsername,
        messageContent: message.messageContent,
        messageEdited: message.messageEdited,
        message_id: message.message_id,
      };
    });

    res.json(formattedMessages);
  } catch (error) {
    console.error("Error occurred while getting messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/", async (req, res) => {
  const { message_id } = rqe.query;
  try {
    await chatModule.deleteMessage(message_id);
    console.log("FROM route.js, Message DELETED.");
  } catch (error) {
    console.error("FROM route.js, Message COULD NOT BE DELETED: ", error);
  }
});

module.exports = router;
