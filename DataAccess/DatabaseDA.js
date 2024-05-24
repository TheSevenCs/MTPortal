const { MongoClient } = require("mongodb");

// MongoDB Connection URI
const uri = "mongodb://ec2-3-144-255-131.us-east-2.compute.amazonaws.com:27017";

// Database Name
const dbName = "test";

// Create a new MongoClient
const client = new MongoClient(uri);

module.exports.addToDatabase = async function (collectionName, data) {
  try {
    // Connect to the MongoDB server
    await client.connect();

    const database = client.db(dbName);

    // Get the specified collection
    const collection = database.collection(collectionName);

    // Insert the array of data into the collection
    await collection.insertOne(data);
  } finally {
    // Close the client connection
    await client.close();
  }
};
module.exports.getFromDatabase = async function (collectionName, filter = {}) {
  let client;
  try {
    // Connect to the MongoDB server
    client = await MongoClient.connect(uri);
    const database = client.db(dbName);

    // Get the specified collection
    const collection = database.collection(collectionName);

    // Grab all data from the collection
    const data = await collection.find(filter).toArray();

    // Return the array of data
    return data;
  } finally {
    // Close the client connection if it was successfully established
    if (client) {
      await client.close();
    }
  }
};

module.exports.deleteFromDatabase = async function (
  collectionName,
  filter = {}
) {
  let client;
  try {
    // Connect to the MongoDB server
    client = await MongoClient.connect(uri);
    const database = client.db(dbName);

    // Get the specified collection
    const collection = database.collection(collectionName);

    // Grab all data from the collection
    await collection.deleteOne(filter);
  } finally {
    // Close the client connection if it was successfully established
    if (client) {
      await client.close();
    }
  }
};

module.exports.generateID = async function (minID, maxID) {
  try {
    min = Math.ceil(minID); // Round up to the nearest integer
    max = Math.floor(maxID); // Round down to the nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min; // Generate the random ID
  } finally {
    // return -1 if theres an issue
    return -1;
  }
};
