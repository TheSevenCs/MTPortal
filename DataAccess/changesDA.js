const db = require("../DataAccess/DatabaseDA.js");

module.exports.CheckCounter = async function (table) {
  const filter = { Table: table }; // Assuming "Table" is the attribute name
  return db.getFromDatabase("Counter", filter).then((response) => {
    // Check if the response contains the expected structure
    if (response && response.Items && Array.isArray(response.Items)) {
      // Find the matching table
      const matchingTable = response.Items.find((item) => item.Table === table);
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
  const newCounter = currentCounter++;
  const expressionAttributeValues = { ":ChangeCounter": { N: newCounter } };
  const primaryKey = { Table: { S: table } };
  db.updateItemInDatabase(
    "Counter",
    primaryKey,
    updateExpression,
    expressionAttributeValues
  );
};
