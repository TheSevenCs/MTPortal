const express = require("express");
const path = require("path");
const { fileURLToPath } = require("url");
const { login, createAccount } = require("../DataAccess/loginDA");

const cors = require("cors");

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.join(__dirname, "..")));
// respond with "hello world" when a GET request is made to the homepage
app.get("/login", (req, res) => {
  const { username, password } = req.query; // Extracting the 'username' and 'password' query parameters
  if (username && password) {
    if (login(username, password)) {
      res.json(true);
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } else {
    // If either username or password is missing in the query, send an error response
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

// Start the server
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
