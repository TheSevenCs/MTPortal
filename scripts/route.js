const express = require("express");
const path = require("path");
const fs = require("fs");
const { fileURLToPath } = require("url");
const loginModule = require("../DataAccess/loginDA");
const eventsModule = require("../DataAccess/eventsDA");
const messageModule = require("../DataAccess/messagesDA");
const chatModule = require("../DataAccess/chatDA");
const clientsModule = require("../DataAccess/clientsDA");
const tasksModule = require("../DataAccess/tasks-issuesDA.js");

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
// Counter endpoints
app.get("/NewChanges", async (req, res) => {
  const { table } = req.query;
  try {
    const currentCounter = await changeModule.CheckCounter(table);
    res.status(200).send(String(currentCounter)); // Send the value as a string
  } catch (error) {
    console.error("Error checking counter:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/NewChanges", async (req, res) => {
  const { table } = req.query;
  try {
    const currentCounter = await changeModule.CheckCounter(table);
    const byteSize = 255;
    if (currentCounter >= byteSize) {
      currentCounter = -1;
    }
    await changeModule.IncreaseCounter(table, currentCounter);
    res.status(200);
  } catch (error) {
    console.error("Error checking counter:", error);
    res.status(500).send("Internal Server Error");
  }
});

// MESSAGES PAGE
app.post("/Messages", async (req, res) => {
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
app.patch("/Messages", async (req, res) => {
  const { message_id, editedMessage } = req.query;
  try {
    await chatModule.editMessage(message_id, editedMessage);
    console.error("FROM route.js, Message EDITED.");
  } catch (error) {
    console.error("FROM route.js, ERROR EDITING Message: ", error);
  }
});
app.get("/Messages", async (req, res) => {
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
app.delete("/Messages", async (req, res) => {
  const { message_id } = rqe.query;
  try {
    await chatModule.deleteMessage(message_id);
    console.log("FROM route.js, Message DELETED.");
  } catch (error) {
    console.error("FROM route.js, Message COULD NOT BE DELETED: ", error);
  }
});

// TASKS/ISSUES PAGE
app.post("/addProject", async (req, res) => {
  const { newName, newClient, newDate, newDesc } = req.query;
  try {
    await tasksModule.addProject(newName, newClient, newDate, newDesc);
    console.log("FROM route.js, NEW Project ADDED.");
  } catch (error) {
    console.error("FROM route.js, ERROR CREATING NEW Project: ", error);
  }
});
app.post("/editProject", async (req, res) => {
  const { editedName, editedClient, editedDate, editedDesc, project_id } =
    req.query;
  try {
    await tasksModule.editProject(
      editedName,
      editedClient,
      editedDate,
      editedDesc,
      project_id
    );
    console.log("FROM route.js, Project EDITED.");
  } catch (error) {
    console.error("FROM route.js, ERROR EDITING Project: ", error);
  }
});
app.get("/getProjects", async (req, res) => {
  try {
    const projects = await tasksModule.getProjects();
    const formattedProjects = projects.map((project) => {
      return {
        projectName: project.projectName,
        projectClient: project.projectClient,
        projectDate: project.projectDate,
        projectDesc: project.projectDesc || "",
        // eventsDA gives 'event_id' which is processed here and given to axios call
        project_id: project.project_id,
      };
    });

    res.json(formattedProjects);
  } catch (error) {
    console.error("Error occurred while getting projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/deleteProject", async (req, res) => {
  const { project_id } = req.query;
  try {
    await tasksModule.deleteProject(project_id);
    console.log(`Project: ${project_id} DELETED.`);
  } catch (error) {
    console.error("FROM route.js, Project COULD NOT BE DELETED: ", error);
  }
});

app.post("/addTI", async (req, res) => {
  const {
    project_id,
    newTIType,
    newTIName,
    newTIDate,
    newTIStatus,
    newTIDesc,
  } = req.query;
  try {
    await tasksModule.addTI(
      project_id,
      newTIType,
      newTIName,
      newTIDate,
      newTIStatus,
      newTIDesc
    );
    console.log("FROM route.js, NEW Task/Issue ADDED.");
  } catch (error) {
    console.error("FROM route.js, ERROR CREATING NEW Task/Issue: ", error);
  }
});
app.patch("/editTI", async (req, res) => {
  const {
    ti_id,
    project_id,
    tableName,
    editedName,
    editedDate,
    editedStatus,
    editedDesc,
  } = req.query;
  try {
    await tasksModule.editTI(
      ti_id,
      project_id,
      tableName,
      editedName,
      editedDate,
      editedStatus,
      editedDesc
    );
    console.log("FROM route.js, Task/Issue EDITED.");
  } catch (error) {
    console.error("FROM route.js, ERROR EDITING Task/Issue: ", error);
  }
});
app.get("/getTIByID", async (req, res) => {
  const { tableName, project_id } = req.query;
  try {
    if (tableName === "Tasks") {
      const tasks = await tasksModule.getTIByID(
        "Tasks",
        "project_id",
        project_id
      );
      const formattedTasks = tasks.map((task) => {
        return {
          taskName: task.taskName,
          taskDate: task.taskDate,
          taskDesc: task.taskDesc,
          taskStatus: task.taskStatus,
          task_id: task.task_id,
          project_id: task.project_id,
        };
      });

      res.json(formattedTasks);
    } else if (tableName === "Issues") {
      const issues = await tasksModule.getTIByID(
        "Issues",
        "project_id",
        project_id
      );
      const formattedIssues = issues.map((issue) => {
        return {
          issueName: issue.issueName,
          issueDate: issue.issueDate,
          issueDesc: issue.issueDesc,
          issueStatus: issue.issueStatus,
          issue_id: issue.issue_id,
          project_id: issue.project_id,
        };
      });

      res.json(formattedIssues);
    } else {
      console.error(
        "FROM route.js/getTIByID(), ERROR IN IF ELSE BLOCK: ",
        error
      );
    }
  } catch (error) {
    console.error("FROM route.js, ERROR WITH getTasksByID: ", error);
  }
});
app.delete("/deleteTI", async (req, res) => {
  const { tableName, ti_id, project_id } = req.query;
  try {
    tasksModule.deleteTI(tableName, ti_id, project_id);
    console.log("FROM route.js, Task/Issue DELETED.");
  } catch (error) {
    console.error("FROM route.js, ERROR DELETING Task/Issue: ", error);
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
app.patch("/editEvent", async (req, res) => {
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
    console.log(`Event: ${eventID} DELETED.`);
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

// HREF BETWEEN PAGES
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
