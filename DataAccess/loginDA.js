const {
  addToDatabase,
  getFromDatabase,
} = require("../DataAccess/DatabaseDA.js");

module.exports.login = async function (username, password) {
  const filter = { username: { $gte: username }, password: { $gte: password } };
  const accounts = getFromDatabase("accounts", filter);
  if (accounts != null) {
    return true;
  }
  return false;
};

module.exports.createAccount = async function (user, pass) {
  const account = { username: user, password: pass };
  await addToDatabase("accounts", account);
};
