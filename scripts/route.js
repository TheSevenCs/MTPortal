const express = require("express");
const mysql = require("mysql");
const path = require("path");
const app = express();
const pool = mysql.createPool({
  connectionLimit: 10, // Maximum number of connections in the pool
  host: "localhost",
  user: "admin",
  password: "pass",
  database: "my_database",
});
app.use(express.static(path.join(__dirname, "..")));
// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  // Send the HTML file as the response
  res.sendFile(path.join(__dirname, "../login.html"));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
