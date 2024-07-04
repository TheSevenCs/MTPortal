const generalModule = require("../DataAccess/DatabaseDA.js");

// Takes parameters and adds new Event to Events Collection
module.exports.addMessage = async function (
  messageAvatar,
  messageUsername,
  messageDate,
  messageContent
) {
  const newMessage = {
    messageAvatar: messageAvatar,
    messageUsername: messageUsername,
    messageDate: messageDate,
    messageContent: messageContent,
    messageEdited: "false",
    message_id: (
      await generalModule.generateID(9000000000000, 9999999999999)
    ).toString(),
  };
  await generalModule.addToDatabase("Messages", newMessage); // Need to await since it's an async function

  console.log("FROM chatDA.js, NEW Message ADDED.");
};
module.exports.editMessage = async function (
  editedmessageid,
  editedMessageContent
) {
  const editedMessage = {
    messageContent: editedMessageContent,
    messageEdited: "true",
  };
  const updateExpression =
    "SET " +
    Object.keys(editedMessage)
      .map((key) => `${key} = :${key}`)
      .join(", ");

  const expressionAttributeValues = {};

  Object.entries(editedMessage).forEach(([key, value]) => {
    expressionAttributeValues[`:${key}`] = { S: value };
  });

  const primaryKey = {
    message_id: { S: editedmessageid },
  };

  await generalModule.updateItemInDatabase(
    "Messages",
    primaryKey,
    updateExpression,
    expressionAttributeValues
  );
};
module.exports.getMessages = async function () {
  const dbResults = await generalModule.getFromDatabase("Messages"); // Need to await since it's an async function
  console.log("Results from DB: ", dbResults);
  return dbResults.Items;
};

module.exports.deleteMessage = async function (eID) {
  const filter = { message_id: eID };
  await generalModule.deleteFromDatabase("Messages", filter); // Need to await since it's an async function
};
