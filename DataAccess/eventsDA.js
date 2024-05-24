const eventModule = require("../DataAccess/DatabaseDA.js");

// Takes parameters and adds new Event to Events Collection
module.exports.addEvent = async function (newName, newDate, newType, newDesc) {
  const newEvent = {
    eventName: newName,
    eventDate: newDate,
    eventType: newType,
    eventDesc: newDesc,
    eventID: eventModule.generateID(9000000000000, 9999999999999),
  };
  eventModule.addToDatabase("events", newEvent);

  console.log("FROM eventsDA.js, NEW Event ADDED.");
};

module.exports.getEvents = async function () {
  const dbResults = eventModule.getFromDatabase("events");
  console.log("Results from DB: ", dbResults);
  return dbResults;
};
module.exports.deleteEvent = async function (eID) {
  const filter = { eventID: eID };
  eventModule.deleteFromDatabase(filter);
};
