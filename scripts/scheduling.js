

const cesarGil = Vue.createApp({
  data() {
    return {
      cart: 0,
      product: "Cesar Gil SEX Slaves",
      brand: "Mexican",
      image: "./images/Andrew.png",
      booleanInStock: true,
      username: "user",
      password: "pass",
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
