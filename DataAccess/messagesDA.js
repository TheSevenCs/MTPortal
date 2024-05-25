const databaseModule = require("../DataAccess/DatabaseDA.js");

module.exports.addMessage = async function (author, date, content) {
  const newMessage = {
    message_author: author,
    message_date: date,
    message_content: content,
    message_id: (
      await databaseModule.generateID(1000000000000, 1999999999999)
    ).toString(),
  };
  await databaseModule.addToDatabase("Messages", newMessage); // Need to await since it's an async function
};
