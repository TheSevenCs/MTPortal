const chatApp = Vue.createApp({
  data() {
    return {
      messages: [],

      currentAvatar: "",
      currentUsername: "",
      newMessageDate: "",
      newMessageContent: "",

      changeCounter: -1,

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
      this.newMessageDate = this.calculateDate();
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
          console.log("Message ADDED SUCCESSFULLY: ", response.data);
        })
        .catch((error) => {
          console.error("ERROR ADDING Message:", error);
        });

      // RESET VARIABLES
      // {
      //   this.currentAvatar = "";
      //   this.currentUsername = "";
      //   this.newMessageDate = "";
      this.newMessageContent = "";
      // }

      // DELAY THEN UPDATE COUNTER
      const delayInMilliseconds = 300;
      setTimeout(() => {
        // post op to /change to increment counter in table
        // NOTE: the params are different from a get req when specifying params
        console.log("NOW UPDATING FROM chat.js.");
        axios
          .post(
            "/change",
            {},
            {
              params: {
                table: "Messages",
              },
            }
          )
          .then((response) => {
            console.log("Message ADDED SUCCESSFULLY: ", response.data);
          })
          .catch((error) => {
            console.error("FROM chat.js, ERROR ADDING Message: ", error);
          });
      }, delayInMilliseconds);

      console.log("EXITED DELAY AFTER UPDATE????");

      // The following code is not needed because the interval calls will handle the update within 0.5 seconds.
      // Likewise, the auto-update is handled by the set increment calling loadMessagesToHTML().

      // DELAY THEN DOUBLE LOAD
      // const delayInMilliseconds = 300;
      // setTimeout(() => {
      //   this.loadMessagesToHTML();
      //   setTimeout(() => {
      //     this.loadMessagesToHTML();
      //   }, delayInMilliseconds);
      // }, delayInMilliseconds);
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
          const newMessages = await axios.get("/messages");
          this.changeCounter = response.data;
          this.messages = newMessages.data;

          // Sort messages by date in ascending order (oldest messages first)
          const sortedMessages = newMessages.data.sort((a, b) => {
            const dateA = new Date(a.messageDate);
            const dateB = new Date(b.messageDate);
            return dateA - dateB; // ascending order
          });

          this.messages = sortedMessages;

          console.log("FROM chat.js, NEW MESSAGES: ", newMessages.data);
        }

        console.log("FROM chat.js, RESPONSE DATA: ", response.data);
      } catch (error) {
        console.error("Error during retrieval:", error);
      }
    },

    calculateDate() {
      // Create a new Date object
      const currentDate = new Date();
      console.log("NEW DATE: ", currentDate);

      // Get the current year, month, day, hour, minute, and second
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Note: January is 0, so we add 1
      const day = currentDate.getDate();
      const hour = currentDate.getHours();
      const minute = currentDate.getMinutes();
      const second = currentDate.getSeconds();

      // Format the date and time as a string
      const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      } ${hour < 10 ? "0" + hour : hour}:${
        minute < 10 ? "0" + minute : minute
      }:${second < 10 ? "0" + second : second}`;

      // Return the formatted date and time
      return formattedDate;
    },
  },
  computed: {
    // calculateDate() {
    //   // Create a new Date object
    //   const currentDate = new Date();

    //   // Get the current year, month, and day
    //   const year = currentDate.getFullYear();
    //   const month = currentDate.getMonth() + 1; // Note: January is 0, so we add 1
    //   const day = currentDate.getDate();

    //   // Format the date as a string
    //   const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    //     day < 10 ? "0" + day : day
    //   }`;

    //   // Return the formatted date
    //   return formattedDate;
    // },
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
