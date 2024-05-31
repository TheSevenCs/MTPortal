const clientsModule = require("../DataAccess/DatabaseDA.js");

module.exports.addClient = async function (
  newName,
  newDate,
  newEmail,
  newPhoneNumber,
  newWebsite,
  newAddress,
  newType,
  newStatus
) {
  const newClient = {
    clientName: newName,
    clientDate: newDate,
    clientEmail: newEmail,
    clientPhoneNumber: newPhoneNumber,
    clientWebsite: newWebsite,
    clientAddress: newAddress,
    clientType: newType,
    clientStatus: newStatus,
    client_id: (
      await clientsModule.generateID(9000000000000, 9999999999999)
    ).toString(),
  };
  await clientsModule.addToDatabase("Clients", newClient); // Need to await since it's an async function

  console.log("FROM clientsDA.js, NEW Client ADDED.");
};

module.exports.editEvent = async function (
  editedName,
  editedDate,
  editedType,
  editedDesc,
  editedID
) {
  const editedEvent = {
    eventName: editedName,
    eventDate: editedDate,
    eventType: editedType,
    eventDesc: editedDesc,
    event_id: editedID,
  };
  await eventModule.addToDatabase("Clients", editedEvent); // Need to await since it's an async function

  console.log("FROM clientsDA.js, Client EDITED.");
};

module.exports.getClients = async function () {
  const dbResults = await clientsModule.getFromDatabase("Clients"); // Need to await since it's an async function
  console.log("Results from DB: ", dbResults);
  return dbResults.Items;
};

module.exports.deleteEvent = async function (eID) {
  try {
    const key = { event_id: eID };
    await eventModule.deleteFromDatabase("Events", key); // Need to await since it's an async function
    console.log("FROM eventsDA.js, Event DELETED.");
  } catch (error) {
    console.log("FROM eventsDA.js, ERROR DELETING Event. ", error);
    throw error;
  }
};
