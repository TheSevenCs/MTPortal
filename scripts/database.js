import { MongoClient } from "mongodb";

// MongoDB Connection URI
const uri = "mongodb://ec2-3-144-255-131.us-east-2.compute.amazonaws.com:27017";

// Database Name
const dbName = "test";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    console.log("Connected to MongoDB server");

    const database = client.db(dbName);

    // Perform operations with the database
    // Example: Insert a document into a collection
    const clients = database.collection("clients");
    const users = database.collection("users");

    console.log("Document inserted successfully");

    // Find all documents in the collection
    const documents = await clients.find({}).toArray();
    console.log("Documents in the collection:", documents);
  } finally {
    // Close the client connection
    await client.close();
    console.log("Connection to MongoDB server closed");
  }
}

async function login(username, password) {
  await client.connect();
  const database = client.db(dbName);
  // Assuming `users` is the MongoDB collection object
  const users = database.collection("users");
  const account = await users.findOne({ username, password });
  await client.close();
  if (account != null) {
    // Authentication successful
    console.log("Documents in the collection:", account);
    return account;
  } else {
    // Authentication failed
    console.log("no users");
    return null;
  }
}

async function createAccount(username, password) {
  
}

run().catch(console.dir);
login("user", "pass").catch(console.dir);
