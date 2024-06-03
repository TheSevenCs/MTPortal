const clientsModule = require("../DataAccess/DatabaseDA.js");

module.exports.addClient = async function (
  newName,
  newDate,
  newEmail,
  newPhoneNumber,
  newWebsite,
  newAddress,
  newType,
  newStatus
) {
  const newClient = {
    clientName: newName,
    clientDate: newDate,
    clientEmail: newEmail,
    clientPhoneNumber: newPhoneNumber,
    clientWebsite: newWebsite,
    clientAddress: newAddress,
    clientType: newType,
    clientStatus: newStatus,
    client_id: (
      await clientsModule.generateID(9000000000000, 9999999999999)
    ).toString(),
  };

  await clientsModule.addToDatabase("Clients", newClient); // Need to await since it's an async function

  console.log("FROM clientsDA.js, NEW Client ADDED.");
};

module.exports.editClient = async function (
  editedName,
  editedDate,
  editedEmail,
  editedPhoneNumber,
  editedWebsite,
  editedAddress,
  editedType,
  editedStatus,
  editedID
) {
  const editedEvent = {
    clientName: editedName,
    clientDate: editedDate,
    clientEmail: editedEmail,
    clientPhoneNumber: editedPhoneNumber,
    clientWebsite: editedWebsite,
    clientAddress: editedAddress,
    clientType: editedType,
    clientStatus: editedStatus,
    client_id: editedID,
  };
  await clientsModule.addToDatabase("Clients", editedEvent); // Need to await since it's an async function

  console.log("FROM clientsDA.js, Client EDITED.");
};

module.exports.getClients = async function () {
  const dbResults = await clientsModule.getFromDatabase("Clients"); // Need to await since it's an async function
  console.log("Results from DB: ", dbResults);
  return dbResults.Items;
};

module.exports.deleteClient = async function (ID) {
  console.log("FROM clientsDA.js, deleteClient CALLED.");
  try {
    const key = { client_id: ID };
    await clientsModule.deleteFromDatabase("Clients", key); // Need to await since it's an async function
    console.log("FROM clientsDA.js, Client DELETED.");
  } catch (error) {
    console.log("FROM clientsDA.js, ERROR DELETING Client. ", error);
    throw error;
  }
};
