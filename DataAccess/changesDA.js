const db = require("../DataAccess/DatabaseDA.js");

module.exports.CheckCounter = async function (table) {
  const filter = { Table: { $gte: table } };
  const counter = db.getFromDatabase("Counter", filter);
  return counter.ChangeCounter;
};
