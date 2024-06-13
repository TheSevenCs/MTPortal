const express = require("express");
const clientsModule = require("../DataAccess/clientsDA.js");
const router = express.Router();

// CLIENTS PAGE
router.post("/", async (req, res) => {
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
router.patch("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.delete("/", async (req, res) => {
  const { clientID } = req.query;
  console.log("FROM route.js: ", clientID);
  try {
    await clientsModule.deleteClient(clientID);
    console.log(`Client: ${clientID} Deleted`);
  } catch (error) {
    console.error(`FROM route.js, Client COULD NOT BE DELETED. `, error);
  }
});

module.exports = router;
