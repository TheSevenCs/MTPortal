const eventModule = require("../DataAccess/DatabaseDA.js");

// Takes parameters and adds new Event to Events Collection
module.exports.addEvent = async function (newName, newDate, newType, newDesc) {
  const newEvent = {
    eventName: newName,
    eventDate: newDate,
    eventType: newType,
    eventDesc: newDesc,
    event_id: (
      await eventModule.generateID(9000000000000, 9999999999999)
    ).toString(),
  };
  await eventModule.addToDatabase("Events", newEvent); // Need to await since it's an async function

  console.log("FROM eventsDA.js, NEW Event ADDED.");
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
  await eventModule.addToDatabase("Events", editedEvent); // Need to await since it's an async function

  console.log("FROM eventsDA.js, Event EDITED.");
};

module.exports.getEvents = async function () {
  const dbResults = await eventModule.getFromDatabase("Events"); // Need to await since it's an async function
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
