const {
  addToDatabase,
  getFromDatabase,
} = require("../DataAccess/DatabaseDA.js");

module.exports.login = function (username, password) {
  const filter = { username: { $gte: username }, password: { $gte: password } };

  // Return the promise chain
  return getFromDatabase("accounts", filter)
    .then((accounts) => {
      // Check if accounts is not null and not empty
      const matchingAccount = accounts.find(
        (account) =>
          account.username === username && account.password === password
      );
      if (matchingAccount) {
        console.log("Login successful");
        return true; // Return true if login is successful
      } else {
        console.log("Login failed");
        return false; // Return false if login fails
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // Rethrow the error to propagate it
    });
};

module.exports.createAccount = async function (user, pass) {
  const account = { username: user, password: pass };
  await addToDatabase("accounts", account);
};
