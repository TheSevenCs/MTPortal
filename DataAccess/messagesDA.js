const generalModule = require("../DataAccess/DatabaseDA.js");

module.exports.addMessage = async function (avatar, username, date, message) {
  const newMessage = {
    messageAvatar: avatar,
    messageUsername: username,
    messageDate: date,
    messageContent: message,
    messageEdited: false,
    message_id: (
      await generalModule.generateID(1000000000000, 1999999999999)
    ).toString(),
  };
  await generalModule.addToDatabase("Messages", newMessage); // Need to await since it's an async function
};

module.exports.editMessage = async function (message_id, newMessage) {
  const editedMessage = {
    messageContent: newMessage,
    messageEdited: true,
  };
  const updateExpression =
    "SET " +
    Object.keys(editedMessage)
      .map((key) => `${key} = :${key}`)
      .join(", ");

  // Constructing the expression attribute values object
  const expressionAttributeValues = {};
  Object.entries(editedMessage).forEach(([key, value]) => {
    expressionAttributeValues[`:${key}`] = { S: value };
  });

  const primaryKey = {
    message_id: { S: message_id },
  };

  await generalModule.updateItemInDatabase(
    "Messages",
    primaryKey,
    updateExpression,
    expressionAttributeValues
  );
  console.log("FROM messagesDA.js, Message EDITED.");
};

module.exports.getMessages = async function () {
  const dbResults = await generalModule.getFromDatabase("Messages"); // Need to await since it's an async function
  console.log("Results from DB: ", dbResults);
  return dbResults.Items;
};

module.exports.deleteMessage = async function (eID) {
  try {
    const key = { message_id: eID };
    await generalModule.deleteFromDatabase("Messages", key); // Need to await since it's an async function
    console.log("FROM messagesDA.js, Message DELETED.");
  } catch (error) {
    console.log("FROM messagesDA.js, ERROR DELETING Message. ", error);
    throw error;
  }
};
