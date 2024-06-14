const db = require("../DataAccess/DatabaseDA.js");

module.exports.CheckCounter = async function (table) {
  if (!table) {
    console.log("Table parameter is undefined or null.");
    return false;
  }

  const filter = { Table: table }; // Assuming "Table" is the attribute name
  return db.getFromDatabase("Counter", filter).then((response) => {
    // Check if the response contains the expected structure
    if (response && response.Items && Array.isArray(response.Items)) {
      // Find the matching table
      const matchingTable = response.Items.find((item) => item.Table === table);
      // console.log("matchingTable: ", matchingTable);
      if (matchingTable) {
        return matchingTable.ChangeCounter;
      } else {
        console.log("Table not found:", table);
        return false;
      }
    } else {
      console.log("Unexpected data format returned from database:", response);
      return false;
    }
  });
};

module.exports.IncreaseCounter = async function (table, currentCounter) {
  const updateExpression = "SET ChangeCounter = :ChangeCounter";
  console.log("FROM changesDA.js, currentCounter: ", currentCounter);
  const newCounter = ++currentCounter; // MONKEY
  console.log("FROM changesDA.js, newCounter: ", newCounter);
  const expressionAttributeValues = {
    ":ChangeCounter": { N: newCounter.toString() },
  };
  const primaryKey = { Table: { S: table } };
  db.updateItemInDatabase(
    "Counter",
    primaryKey,
    updateExpression,
    expressionAttributeValues
  );
};
