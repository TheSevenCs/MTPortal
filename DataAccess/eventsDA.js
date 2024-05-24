const {
  addToDatabase,
  getFromDatabase,
} = require("../DataAccess/DatabaseDA.js");

// Takes parameters and adds new Event to Events Collection
module.exports.addEvent = async function (newName, newDate, newType, newDesc) {
  const newEvent = {
    eventName: newName,
    eventDate: newDate,
    eventType: newType,
    eventDesc: newDesc,
  };
  addToDatabase("events", newEvent);

  console.log("FROM eventsDA.js, NEW Event ADDED.");
};

module.exports.getEvents = async function () {
  const dbResults = getFromDatabase("events");
  console.log("Results from DB: ", dbResults);
  return dbResults;
};
