async function checkLogin(username, password) {
  try {
    const response = await axios.get("/CheckLogin", {
      params: {
        username: username,
        password: password,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const loginProcess = Vue.createApp({
  data() {
    return {
      usernameInput: "",
      passwordInput: "",
      creatingAccount: false,
    };
  },
  methods: {
    async Login() {
      try {
        const data = await checkLogin(this.usernameInput, this.passwordInput);
        console.log("Login successful:", data);
        // Handle response data as needed
      } catch (error) {
        console.error("Error during login:", error);
        // Handle errors if needed
      }
    },
    createAccount() {
      this.creatingAccount = true;
    },
    cancel() {
      this.creatingAccount = false;
    },
  },
});
