// COUNTER ENDPOINTS
const express = require("express");
const changeModule = require("../DataAccess/changesDA.js");
const router = express.Router();

router.get("/", async (req, res) => {
  const { table } = req.query;
  try {
    const currentCounter = await changeModule.CheckCounter(table);
    res.status(200).send(String(currentCounter)); // Send the value as a string
  } catch (error) {
    console.error("Error checking counter:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  const { table } = req.query;
  try {
    console.log(
      "ENTERING changeModule.CheckCounter(table), param table: ",
      table
    );
    // Change from const to let to change later
    // Next line gets from database
    let currentCounter = await changeModule.CheckCounter(table);
    console.log("FROM changes.js, currentCounter: ", currentCounter);
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

module.exports = router;
