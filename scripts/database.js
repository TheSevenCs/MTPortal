import { MongoClient } from "mongodb";

// MongoDB Connection URI
const uri = "mongodb://ec2-3-144-255-131.us-east-2.compute.amazonaws.com:27017";

// Database Name
const dbName = "test";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    console.log("Connected to MongoDB server");

    const database = client.db(dbName);

    // Perform operations with the database
    // Example: Insert a document into a collection
    const collection = database.collection("documents");
    await collection.insertOne({ name: "John Doe", age: 30 });

    console.log("Document inserted successfully");

    // Find all documents in the collection
    const documents = await collection.find({}).toArray();
    console.log("Documents in the collection:", documents);
  } finally {
    // Close the client connection
    await client.close();
    console.log("Connection to MongoDB server closed");
  }
}

run().catch(console.dir);
