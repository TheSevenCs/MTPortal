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

module.exports.getEvents = async function () {
  const dbResults = await eventModule.getFromDatabase("Events"); // Need to await since it's an async function
  console.log("Results from DB: ", dbResults);
  return dbResults.Items;
};

module.exports.deleteEvent = async function (eID) {
  const filter = { eventID: eID };
  await eventModule.deleteFromDatabase("Events", filter); // Need to await since it's an async function
};
