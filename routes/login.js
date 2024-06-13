//LOGIN PAGE
const express = require("express");
const loginModule = require("../DataAccess/loginDA");
const router = express.Router();

router.post("/check", async (req, res) => {
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

router.post("/create", async (req, res) => {
  const { username, password } = req.query;
  try {
    await CreateAccount(username, password);
    console.log("Account created successfully");
  } catch (error) {
    console.error("Error creating account:", error);
  }
});

module.exports = router;
