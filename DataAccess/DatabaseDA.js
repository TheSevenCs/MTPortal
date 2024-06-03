const AWS = require("aws-sdk");
require("dotenv").config();
// Configure AWS
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const addToDatabase = async (table, data) => {
  try {
    const params = {
      TableName: table,
      Item: data, // The data you want to add
    };

    // Perform the put operation to add data to the table
    const result = await dynamoClient.put(params).promise();

    console.log("Data added successfully:", result);
    // return result; // Optionally, return the result of the operation
  } catch (error) {
    console.error("Error adding data:", error);
    throw error; // Optionally, rethrow the error for handling elsewhere
  }
};

const getFromDatabase = async (table, filter = {}) => {
  try {
    const params = {
      TableName: table,
      FilterExpression: filter.Expression, // Accessing the expression from the filter object
      ExpressionAttributeValues: filter.ExpressionAttributeValues, // Optional: Provide ExpressionAttributeValues if necessary
    };

    const data = await dynamoClient.scan(params).promise();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

const deleteFromDatabase = async (table, key) => {
  try {
    const params = {
      TableName: table,
      Key: key, // Identifier for data to delete
    };

    // DELETE ENTRY HERE
    const data = await dynamoClient.delete(params).promise();

    console.log("FROM DatabaseDA.js, ITEM DELETED: ", data);
    // return data; // Optional ??
  } catch (error) {
    console.error("FROM DatabaseDA.js, ERROR DELETING ITEM: ", error);
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
};
