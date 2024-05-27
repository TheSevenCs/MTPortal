const express = require("express");
const path = require("path");
const fs = require("fs");
const { fileURLToPath } = require("url");
const loginModule = require("../DataAccess/loginDA");
const eventsModule = require("../DataAccess/eventsDA");
const messageModule = require("../DataAccess/messagesDA");
const chatModule = require("../DataAccess/chatDA");

const cors = require("cors");

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const directory = path.join(__dirname, "..");
app.use(express.static(path.join(__dirname, "..")));
// respond with "hello world" when a GET request is made to the homepage

app.get("/CheckLogin", async (req, res) => {
  const { username, password } = req.query;

  if (username && password) {
    try {
      const isAuthenticated = await loginModule.login(username, password);

      if (isAuthenticated) {
        res.json(true);
      } else {
        console.log(isAuthenticated);
        res.status(401).json(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).send("Username or password is missing");
  }
});
app.get("/CreateAccount", async (req, res) => {
  const { username, password } = req.query;
  try {
    await CreateAccount(username, password);
    console.log("Account created successfully");
  } catch (error) {
    console.error("Error creating account:", error);
  }
});

// EVENTS PAGE
app.post("/addEvent", async (req, res) => {
  const { newName, newDate, newType, newDesc } = req.query;
  try {
    await eventsModule.addEvent(newName, newDate, newType, newDesc);
    console.log("FROM route.js, NEW Event ADDED.");
  } catch (error) {
    console.error("FROM route.js, ERROR CREATING NEW Event: ", error);
  }
});

app.post("/Message", async (req, res) => {
  const { author, date, content } = req.params.page;
  try {
    await messageModule.addMessage(author, date, content);
    console.log("FROM route.js, NEW Event ADDED.");
  } catch (error) {
    console.error("FROM route.js, ERROR CREATING NEW Event: ", error);
  }
});

app.delete("/Events", async (req, res) => {
  const { eventID } = req.query;
  try {
    await eventsModule.deleteEvent(eventID);
    console.log(`Event: ${eventID} Deleted`);
  } catch (error) {
    console.error(`FROM route.js, Event COULD NOT BE DELETED. `, error);
  }
});
app.get("/getEvents", async (req, res) => {
  try {
    const events = await eventsModule.getEvents();
    const formattedEvents = events.map((event) => {
      return {
        eventName: event.eventName,
        eventDate: event.eventDate,
        eventType: event.eventType,
        eventDesc: event.eventDesc || "",
        // eventsDA gives 'event_id' which is processed here and given to axios call
        eventID: event.event_id,
      };
    });

    res.json(formattedEvents);
  } catch (error) {
    console.error("Error occurred while getting events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// MESSAGES PAGE
app.post("/Messages", async (req, res) => {
  const { newAvatarPath, newMessageContent, newUsername } = req.query;
  try {
    await chatModule.addMessage(newAvatarPath, newMessageContent, newUsername);
    console.log("FROM route.js, NEW Message ADDED.");
  } catch (error) {
    console.error("FROM route.js, ERROR ADDING Message: ", error);
  }
});
app.get("/Messages", async (req, res) => {
  try {
    const messages = await chatModule.getMessages();
    const formattedMessages = messages.map((message) => {
      return {
        avatarPath: message.avatarPath,
        messageContent: message.messageContent,
        username: message.username,
        // eventDesc: event.eventDesc || "",
      };
    });

    res.json(formattedMessages);
  } catch (error) {
    console.error("Error occurred while getting messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/:page", (req, res) => {
  const page = req.params.page;
  const filePath = path.join(directory, `${page}.html`);
  console.log(directory + `${page}.html`);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    // If the file does not exist, send a 404 error
    res.status(404).send("Page not found");
  }
});

// Start the server
const PORT = 5500;
const HOST = "127.0.0.1";
app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`);
});
