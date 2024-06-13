const express = require("express");
const eventsModule = require("../DataAccess/eventsDA");
const router = express.Router();

// EVENTS PAGE
router.post("/", async (req, res) => {
  const { newName, newDate, newType, newDesc } = req.query;
  try {
    await eventsModule.addEvent(newName, newDate, newType, newDesc);
    console.log("FROM route.js, NEW Event ADDED.");
  } catch (error) {
    console.error("FROM route.js, ERROR CREATING NEW Event: ", error);
  }
});

router.patch("/", async (req, res) => {
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

router.get("/", async (req, res) => {
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
router.delete("/", async (req, res) => {
  const { eventID } = req.query;
  try {
    await eventsModule.deleteEvent(eventID);
    console.log(`Event: ${eventID} DELETED.`);
  } catch (error) {
    console.error(`FROM route.js, Event COULD NOT BE DELETED. `, error);
  }
});

module.exports = router;
