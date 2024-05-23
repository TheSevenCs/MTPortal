const { MongoClient } = require("mongodb");

// MongoDB Connection URI
const uri = "mongodb://ec2-3-144-255-131.us-east-2.compute.amazonaws.com:27017";

// Database Name
const dbName = "test";

// Create a new MongoClient
const client = new MongoClient(uri);

async function login(username, password) {
  const accounts = getFromDatabase("accounts");
  accounts;
}

async function createAccount(user, pass) {
  const account = { username: user, password: pass };
  await addToDatabase("accounts", account);
}

async function addToDatabase(collectionName, data) {
  try {
    // Connect to the MongoDB server
    await client.connect();

    console.log("Connected to MongoDB server");

    const database = client.db(dbName);

    // Get the specified collection
    const collection = database.collection(collectionName);

    // Insert the array of data into the collection
    await collection.insertOne(data);

    console.log("Data inserted successfully into collection:", collectionName);
  } finally {
    // Close the client connection
    await client.close();
    console.log("Connection to MongoDB server closed");
  }
}
async function getFromDatabase(collectionName, filter = "") {
  try {
    // Connect to the MongoDB server
    await client.connect();

    const database = client.db(dbName);

    // Get the specified collection
    const collection = database.collection(collectionName);

    // Grab all data from the collection
    const data = await collection.find(filter).toAqrray();
    console.log(data);
    // Return the array of data
    return data;
  } finally {
    // Close the client connection
    await client.close();
    console.log("Connection to MongoDB server closed");
  }
}
// createAccount("user", "pass").catch(console.dir);
getFromDatabase("accounts").catch(console.dir);
