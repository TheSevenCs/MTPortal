const fs = require("fs");

const accountCachePath = "./cache/cache.json";

function saveAccountKey(accountKey) {
  // Create an object to store the account key
  const data = {
    accountKey: accountKey,
  };

  // Convert the object to a JSON string
  const jsonData = JSON.stringify(data, null, 2);

  // Write the JSON string to a file
  fs.writeFile(accountCachePath, jsonData, (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("Account key saved successfully");
    }
  });
}

function getAccountKey() {
  try {
    // Read the contents of the JSON file
    const jsonData = fs.readFileSync(accountCachePath, "utf8");

    // Parse the JSON data
    const data = JSON.parse(jsonData);

    // Access the key from the JSON data
    const accountKey = data.accountKey;

    return accountKey;
  } catch (error) {
    console.error("Error reading account key:", error);
    return null;
  }
}

module.exports = {
  saveAccountKey: saveAccountKey,
  getAccountKey: getAccountKey,
};
