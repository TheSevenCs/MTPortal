import { MongoClient } from "mongodb";

// MongoDB Connection URI
const uri = "mongodb://ec2-3-144-255-131.us-east-2.compute.amazonaws.com:27017";

// Database Name
const dbName = "test";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  console.log("RUN METHOD");
}

async function addEvent() {}

async function initEvents() {
  try {
    // Connect to MongoDB server
    await client.connect();
    console.log("FROM eventsServerside.js, CONNECTED TO MongoDB SERVER.");

    // Specify database and collections
    const database = client.db(dbName);
    const collectionEvents = database.collection("events");
    console.log(
      "FROM eventsServerside.js, DATABASE and COLLECTION(S) SPECIFIED."
    );
  } catch {
    console.log("FROM CATCH BLOCK");
  } finally {
    // Close the client connection
    await client.close();
    console.log("Connection to MongoDB server closed");
  }
}

run().catch(console.dir);
loadEvents.catch(console.dir);
