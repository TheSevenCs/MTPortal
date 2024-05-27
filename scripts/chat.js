const app = Vue.createApp({
  data() {
    return {
      currentText: "",
      messages: [],
      newAvatarPath: "",
      newMessageContent: "",
      newUsername: "",

      // Need a way to set an avatar path and username when logging in?
      // could consider some kind of global return value/variable on login
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
    async loadMessagesToHTML() {
      try {
        const response = await axios.get("/Messages");
        this.messages = response.data;
        // Handle response data as needed

        // 0.5 SEC DELAY INTO RELOAD
        const delayInMilliseconds = 500;
        setTimeout(() => {
          this.loadMessagesToHTML();
        }, delayInMilliseconds);
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
    addMessage() {
      return (
        "/Messages?newAvatarPath=" +
        this.newAvatarPath +
        "&newMessageContent=" +
        this.newMessageContent +
        "&newUsername=" +
        this.newUsername
      );
    },
  },
  mounted() {
    this.loadMessagesToHTML();
    console.log("FROM events.js mounted(), loadMessagesToHTML() CALLED.");
  },
});
