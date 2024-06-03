const express = require("express");
const path = require("path");
const fs = require("fs");
const { fileURLToPath } = require("url");
const loginModule = require("../DataAccess/loginDA");
const eventsModule = require("../DataAccess/eventsDA");
const messageModule = require("../DataAccess/messagesDA");
const chatModule = require("../DataAccess/chatDA");
const clientsModule = require("../DataAccess/clientsDA");

const changeModule = require("../DataAccess/changesDA.js");
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
app.get("/NewChanges", async (req, res) => {
  const { table } = req.query;
  try {
    const currentCounter = await changeModule.CheckCounter(table);
    res.status(200).json({ currentCounter });
  } catch (error) {
    console.error("Error checking counter:", error);
    res.status(500).send("Internal Server Error");
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
app.post("/editEvent", async (req, res) => {
  const { editedName, editedDate, editedType, editedDesc, editedID } =
    req.query;
  try {
    await eventsModule.editEvent(
      editedName,
      editedDate,
      editedType,
      editedDesc,
      editedID
    );
    console.log("FROM route.js, Event EDITED.");
  } catch (error) {
    console.error("FROM route.js, ERROR EDITING Event: ", error);
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

// CLIENTS PAGE
app.post("/addClient", async (req, res) => {
  const {
    newName,
    newDate,
    newEmail,
    newPhoneNumber,
    newWebsite,
    newAddress,
    newType,
    newStatus,
  } = req.query;
  try {
    await clientsModule.addClient(
      newName,
      newDate,
      newEmail,
      newPhoneNumber,
      newWebsite,
      newAddress,
      newType,
      newStatus
    );
    console.log("FROM route.js, NEW Client ADDED.");
  } catch (error) {
    console.error("FROM route.js, ERROR CREATING NEW Client: ", error);
  }
});
app.post("/editClient", async (req, res) => {
  const {
    editedName,
    editedDate,
    editedEmail,
    editedPhoneNumber,
    editedWebsite,
    editedAddress,
    editedType,
    editedStatus,
    editedID,
  } = req.query;
  try {
    await clientsModule.editClient(
      editedName,
      editedDate,
      editedEmail,
      editedPhoneNumber,
      editedWebsite,
      editedAddress,
      editedType,
      editedStatus,
      editedID
    );
    console.log("FROM route.js, Client EDITED.");
  } catch (error) {
    console.error("FROM route.js, ERROR EDITING Client: ", error);
  }
});
app.get("/getClients", async (req, res) => {
  try {
    const clients = await clientsModule.getClients();
    const formattedClients = clients.map((client) => {
      return {
        clientName: client.clientName,
        clientDate: client.clientDate,
        clientEmail: client.clientEmail,
        clientPhoneNumber: client.clientPhoneNumber,
        clientWebsite: client.clientWebsite,
        clientAddress: client.clientAddress,
        clientType: client.clientType,
        clientStatus: client.clientStatus,
        // eventDesc: event.eventDesc || "",
        // eventsDA gives 'event_id' which is processed here and given to axios call
        clientID: client.client_id,
      };
    });

    res.json(formattedClients);
  } catch (error) {
    console.error("Error occurred while getting clients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/deleteClient", async (req, res) => {
  const { clientID } = req.query;
  console.log("FROM route.js: ", clientID);
  try {
    await clientsModule.deleteClient(clientID);
    console.log(`Client: ${clientID} Deleted`);
  } catch (error) {
    console.error(`FROM route.js, Client COULD NOT BE DELETED. `, error);
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
