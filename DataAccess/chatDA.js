const chatModule = require("../DataAccess/DatabaseDA.js");

// Takes parameters and adds new Event to Events Collection
module.exports.addMessage = async function (
  newAvatarPath,
  newMessageContent,
  newUsername
) {
  const newMessage = {
    avatarPath: newAvatarPath,
    messageContent: newMessageContent,
    username: newUsername,
    message_id: (
      await chatModule.generateID(9000000000000, 9999999999999)
    ).toString(),
  };
  await chatModule.addToDatabase("Messages", newMessage); // Need to await since it's an async function

  console.log("FROM chatDA.js, NEW Message ADDED.");
};
module.exports.editMessage = async function (
  editedMessageContent,
  editedmessageid
) {
  const editedMessage = {
    editedMessageContent,
  };
  const updateExpression =
    "SET " +
    Object.keys(editedMessage)
      .map((key) => `${key} = :${key}`)
      .join(", ");
  Object.entries(editedMessage).forEach(([key, value]) => {
    expressionAttributeValues[`:${key}`] = { S: value };
  });

  const primaryKey = {
    message_id: { S: editedmessageid },
  };

  await chatModule.updateItemInDatabase(
    "Messages",
    primaryKey,
    updateExpression,
    expressionAttributeValues
  );
};
module.exports.getMessages = async function () {
  const dbResults = await chatModule.getFromDatabase("Messages"); // Need to await since it's an async function
  console.log("Results from DB: ", dbResults);
  return dbResults.Items;
};

module.exports.deleteEvent = async function (eID) {
  const filter = { eventID: eID };
  await eventModule.deleteFromDatabase("Events", filter); // Need to await since it's an async function
};
