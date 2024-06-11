const fs = require("fs");

const accountCachePath = "./cache/cache.json";

function saveAccountKey(accountKey) {
  // Calculate the expiration timestamp
  const expirationTimeInDays = 6;
  const expirationTimeInSeconds = expirationTimeInDays * 60 * 60 * 24;
  const expirationTimestamp = Date.now() + expirationTimeInSeconds;

  // Create an object to store the account key and expiration timestamp
  const data = {
    accountKey: accountKey,
    expirationTimestamp: expirationTimestamp,
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

// Function to retrieve the account key from the JSON file and check expiration
function getAccountKey() {
  try {
    // Check if the file exists
    if (!fs.existsSync(accountCachePath)) {
      return "no-file";
    }

    // Read the contents of the JSON file
    const jsonData = fs.readFileSync(accountCachePath, "utf8");

    // Check if the file is empty or doesn't contain valid JSON data
    if (!jsonData.trim()) {
      return null;
    }

    // Parse the JSON data
    const data = JSON.parse(jsonData);
    // Check if the key has expired
    const expirationTimestamp = data.expirationTimestamp;
    if (expirationTimestamp && Date.now() > expirationTimestamp) {
      // Invalidate the key by removing it from the file
      fs.unlinkSync(accountCachePath);
      return "expired";
    }

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
