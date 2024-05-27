const eventsApp = Vue.createApp({
  data() {
    return {
      events: [],
      newEventName: "",
      newEventDate: "",
      newEventType: "",
      newEventDesc: "",
      displayAddModal: false,
    };
  },
  methods: {
    addNewEvent() {
      axios
        .post(this.addString)
        .then((response) => {
          console.log("Event added successfully:", response.data);
          // Additional handling if needed
        })
        .catch((error) => {
          console.error("Error adding event:", error);
        });

      // RESET VARIABLES
      this.newEventName = "";
      this.newEventDate = "";
      this.newEventType = "";
      this.newEventDesc = "";

      // 0.5 SEC DELAY INTO RELOAD
      const delayInMilliseconds = 500;
      setTimeout(() => {
        this.loadEventsToHTML();
        this.displayAddModal = false;
      }, delayInMilliseconds);

      // 2nd LOAD
      setTimeout(() => {
        this.loadEventsToHTML();
      }, delayInMilliseconds);
    },
    toggleAddModal() {
      this.displayAddModal = !this.displayAddModal;
    },
    async loadEventsToHTML() {
      try {
        const response = await axios.get("/getEvents");
        this.events = response.data;
        console.log("FROM events.js, loadEventsToHTML() CALLED.");
        // Handle response data as needed
      } catch (error) {
        console.error("Error during retrieval:", error);
        // Handle errors if needed
      }
    },
  },
  computed: {
    addString() {
      return (
        "/addEvent?newName=" +
        this.newEventName +
        "&newDate=" +
        this.newEventDate +
        "&newType=" +
        this.newEventType +
        "&newDesc=" +
        this.newEventDesc
      );
    },
  },
  mounted() {
    // mounted() outlines what is supposed to execute on application mount
    this.loadEventsToHTML();
    console.log("FROM events.js mounted(), loadEventsToHTML() CALLED.");
  },
});
