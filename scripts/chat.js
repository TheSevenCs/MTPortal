const app = Vue.createApp({
  data() {
    return {
      geeknerd: "gay",
      messages: [
        {
          avatarPath: "./images/Sample_PFP.png",
          messageContent: "Sample Messages",
          username: "7C's",
        },
      ],
      newAvaterPath: "",
      newMessageContent: "",
      newUsername: "",
    };
  },
  methods: {
    addNewMessage() {
      axios
        .post(this.addMessage)
        .then((response) => {
          console.log("Message added successfully: ", response.data);
        })
        .catch((error) => {
          console.error("Error adding message: ", error);
        });

      // RESET VARIABLES
      this.newAvaterPath = "";
      this.newMessageContent = "";
      this.newUsername = "";

      // ADD DELAY IF NEEDED
    },
  },
  computed: {
    addMessage() {
      return (
        "/addMessage?newAvatarPath=" +
        this.newAvaterPath +
        "&newMessageContent=" +
        this.newMessageContent +
        "&newUsername=" +
        this.newUsername
      );
    },
  },
});
