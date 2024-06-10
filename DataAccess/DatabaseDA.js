const {
  DynamoDBClient,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");
const {
  UpdateCommand,
  PutCommand,
  ScanCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
} = require("@aws-sdk/lib-dynamodb");
require("dotenv").config();

// Create a new DynamoDB client
const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const client = DynamoDBDocumentClient.from(dynamoClient);

const addToDatabase = async (table, data) => {
  try {
    const params = {
      TableName: table,
      Item: data,
    };

    // Perform the put operation to add data to the table
    const result = await dynamoClient.send(new PutCommand(params));
    return result;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
};

const getFromDatabase = async (table, attribute = null, value = null) => {
  try {
    const params = {
      TableName: table,
    };

    if (attribute && value) {
      params.FilterExpression = `${attribute} = :value`;
      params.ExpressionAttributeValues = {
        ":value": value,
      };
    }

    const result = await dynamoClient.send(new ScanCommand(params));
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

const deleteFromDatabase = async (table, key) => {
  try {
    const params = {
      TableName: table,
      Key: key,
    };

    const result = await dynamoClient.send(new DeleteCommand(params));
    console.log("FROM DatabaseDA.js, ITEM DELETED.");
    return result;
  } catch (error) {
    console.error("FROM DatabaseDA.js, ERROR DELETING ITEM: ", error);
    throw error;
  }
};

const updateItemInDatabase = async (
  tableName,
  key,
  updateExpression,
  expressionAttributeValues
) => {
  try {
    const params = {
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    };
    console.log(params);
    const result = await client.send(new UpdateItemCommand(params));
    console.log("Success", result);
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};
const generateID = async (minID, maxID) => {
  min = Math.ceil(minID); // Round up to the nearest integer
  max = Math.floor(maxID); // Round down to the nearest integer
  return Math.floor(Math.random() * (max - min + 1)) + min; // Generate the random ID
};
module.exports = {
  getFromDatabase: getFromDatabase,
  // getNewestID: getNewestID,
  generateID: generateID,
  deleteFromDatabase: deleteFromDatabase,
  addToDatabase: addToDatabase,
  updateItemInDatabase: updateItemInDatabase,
};
