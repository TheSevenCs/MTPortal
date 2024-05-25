const app = Vue.createApp({
  data() {
    return {
      geeknerd: "gay",
      messages: [],
      currentText: "",
    };
  },
  methods: {
    submitMessage() {
      this.messageContent = this.currentText;
      console.log(this.calculateDate);
    },
    async postMessage() {
      const response = await axios.get("/CheckLogin", {
        params: {
          avatar: this.avatarPath,
          author: this.username,
          date: this.calculateDate,
        },
      });
    },

    async loadMessages() {
      try {
        const response = await axios.get("/Message");
        this.events = response.data;
        // Handle response data as needed
      } catch (error) {
        console.error("Error during retrieval:", error);
        // Handle errors if needed
      }
    },
  },
  computed: {
    calculateDate() {
      // Create a new Date object
      const currentDate = new Date();

      // Get the current year, month, and day
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Note: January is 0, so we add 1
      const day = currentDate.getDate();

      // Format the date as a string
      const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;

      // Return the formatted date
      return formattedDate;
    },
  },
});
