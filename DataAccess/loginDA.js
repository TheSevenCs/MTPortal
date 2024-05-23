
async function login(username, password) {
  const filter = { username: { $gte: username }, password: { $gte: password } };
  const accounts = getFromDatabase("accounts", filter);
  if (accounts != null) {
    return true;
  }
  return false;
}

async function createAccount(user, pass) {
  const account = { username: user, password: pass };
  await addToDatabase("accounts", account);
}
