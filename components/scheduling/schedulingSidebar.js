cesarGil.component("component-sidebar", {
  template:
    /*html*/
    `
    <!-- PRODUCT NAME AND IMAGE -->
    <div :style="{ backgroundColor: sidebarBackground }" class="sidebar">
      <button class = "buttonManageEvent" @click = changeBG() >Manage Event</button>
    </div>
    `,
  data() {
    return {
      sidebarBackground: "#00FF00",

      product: "Cesar Gil SEX Slaves",
      brand: "Mexican",
      image: "./images/Andrew.png",
      booleanInStock: true,
      username: "user",
      password: "pass",
      details: ["femboy", "thiccccccc", "zesty"],
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    updateImage(imagePath) {
      this.image = imagePath;
    },
    changeBG() {
      this.sidebarBackground = "#121212";
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
