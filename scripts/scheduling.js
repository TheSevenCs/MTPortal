const cesarGil = Vue.createApp({
  data() {
    return {
      cart: 0,
      product: "Cesar Gil SEX Slaves",
      brand: "Mexican",
      image: "./images/Andrew.png",
      booleanInStock: true,
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
    checkLogin() {
      axios
        .get("http://localhost:3000/")
        .then((response) => {
          console.log(response);
          this.product = "from axios.get()";
        })
        .catch((error) => {
          console.log(error);
          this.product = "ERROR From axios.get()";
        });
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
