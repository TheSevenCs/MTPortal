const chatApp = Vue.createApp({
  data() {
    return {
      messages: [],

      currentAvatar: "",
      currentUsername: "",
      newMessageDate: "",
      newMessageContent: "",

      changeCounter: 0,

      // Need a way to set an avatar path and username when logging in?
      // could consider some kind of global return value/variable on login
    };
  },
  methods: {
    // TESTER FUNCTIONS
    setUserAndre() {
      this.currentUsername = "Andre";
      this.currentAvatar = "./images/pfp.png";
      console.log("CURRENT USER: Andre.");
    },

    // DATABASE FUNCTIONS
    addMessage() {
      this.newMessageDate = this.calculateDate;
      axios
        .post(
          "/messages",
          {},
          {
            params: {
              messageAvatar: this.currentAvatar,
              messageUsername: this.currentUsername,
              messageDate: this.newMessageDate,
              messageContent: this.newMessageContent,
            },
          }
        )
        .then((response) => {
          console.log("Event added successfully:", response.data);
          // Additional handling if needed
        })
        .catch((error) => {
          console.error("Error adding event:", error);
        });

      // RESET VARIABLES
      {
        this.newMessageAvatar = "";
        this.newMessageUsername = "";
        this.newMessageDate = "";
        this.newMessageContent = "";
      }

      // DELAY THEN DOUBLE LOAD
      const delayInMilliseconds = 300;
      setTimeout(() => {
        this.loadMessagesToHTML();
        setTimeout(() => {
          this.loadMessagesToHTML();
        }, delayInMilliseconds);
      }, delayInMilliseconds);
    },

    submitMessage() {
      this.messageContent = this.currentText;
      console.log(this.calculateDate);
    },
    async postMessage() {
      const response = await axios.get("/account/check", {
        params: {
          // avatar: this.avatarPath,
          author: this.username,
          date: this.calculateDate,
        },
      });
    },

    async loadMessagesToHTML() {
      try {
        const response = await axios.get("/change", {
          params: {
            table: "Messages",
          },
        });

        if (response.data != this.changeCounter) {
          console.log("RESPONSE DATA != CHANGE COUNTER");
          const newMessages = await axios.get("/message");
          this.changeCounter = response.data;
          this.messages = newMessages.data;

          console.log("FROM chat.js, NEW MESSAGES: ", newMessages.data);
        }

        // REPLACE THE FOLLOWING WITH SET INTERVAL FUNCTION THAT CALLS THIS FUNCTION

        // 0.5 SEC DELAY INTO RELOAD
        // const delayInMilliseconds = 500;
        // setTimeout(() => {
        //   this.loadMessagesToHTML();
        // }, delayInMilliseconds);
      } catch (error) {
        console.error("Error during retrieval:", error);
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
    addString() {
      return (
        "/Messages?messageAvatar=" +
        this.currentAvatar +
        "&messageUsername=" +
        this.currentUsername +
        "&messageDate=" +
        this.newMessageDate +
        "&messageContent=" +
        this.newMessageContent
      );
    },
  },
  mounted() {
    setInterval(() => {
      this.loadMessagesToHTML();
    }, 500);

    console.log(
      "FROM events.js mounted(), loadMessagesToHTML() INTERVAL CALLED."
    );
  },
});
