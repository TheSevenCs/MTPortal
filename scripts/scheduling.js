async function checkLogin(username, password) {
  try {
    const response = await axios.get("/login", {
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

const cesarGil = Vue.createApp({
  data() {
    return {
      cart: 0,
      product: "Cesar Gil SEX Slaves",
      brand: "Mexican",
      image: "./images/Andrew.png",
      booleanInStock: true,
<<<<<<< Updated upstream

      usernameInput: "testerUsername",
      passwordInput: "testerPassword",

=======
      username: "user",
      password: "pass",
>>>>>>> Stashed changes
      details: ["femboy", "thiccccccc", "zesty"],
      variants: [
        {
          id: 56,
          version: "normal",
          image: "./Andrew.png",
          color: "gray",
          quantity: 50,
        },
        {
          id: 57,
          version: "extra fruity",
          image: "./Cesar.gif",
          color: "pink",
          quantity: 10,
        },
      ],
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    updateImage(imagePath) {
      this.image = imagePath;
    },
<<<<<<< Updated upstream
    checkLogin() {
      axios
        .get("http://localhost:3000/")
        .then((response) => {
          console.log(response);
          this.product = "From axios.get()";
        })
        .catch((error) => {
          console.log(error);
          this.product = "ERROR From axios.get()";
        });
    },
    availableUsername() {
      axios.get("https://localhost:3000/", {
        params: { username: this.username },
      });
    },
=======

    async Login() {
      try {
        const data = await checkLogin(this.username, this.password);
        console.log("Login successful:", data);
        // Handle response data as needed
      } catch (error) {
        console.error("Error during login:", error);
        // Handle errors if needed
      }
    },

>>>>>>> Stashed changes
    createAccount() {
      console.log("FROM createAccount: TESTING CONSOLE MESSAGE");
    },
    consoleTest() {
      console.log("FROM consoleTest: TESTING CONSOLE MESSAGE");
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
  },
});
