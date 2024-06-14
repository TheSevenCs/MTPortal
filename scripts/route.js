const express = require("express");
const path = require("path");
const fs = require("fs");
const { fileURLToPath } = require("url");

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

// Account router
const loginRouter = require("../routes/login.js");
app.use("/account", loginRouter);

// New changes counter router
const counterRouter = require("../routes/changes.js");
app.use("/change", counterRouter);

// Events router
const eventRouter = require("../routes/events.js");
app.use("/event", eventRouter);

// Clients router
const clientRouter = require("../routes/clients.js");
app.use("/client", clientRouter);

// Tasks and issues router
const TIRouter = require("../routes/task-issues.js");
app.use("/task-issue", TIRouter);

// Projects router
const projectRouter = require("../routes/projects.js");
app.use("/project", projectRouter);

// Messages router
const messageRouter = require("../routes/messages.js");
app.use("/messages", messageRouter);

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
