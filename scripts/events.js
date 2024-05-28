const eventsApp = Vue.createApp({
  data() {
    return {
      events: [],
      displayEvents: [],
      newEventName: "",
      newEventDate: "",
      newEventType: "",
      newEventDesc: "",
      displayAddModal: false,
      selectedFilter: "",
    };
  },
  methods: {
    toggleAddModal() {
      this.displayAddModal = !this.displayAddModal;
    },

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

      // CALL LOAD() TWICE
      {
        // 0.5 SEC DELAY INTO RELOAD
        const delayInMilliseconds = 500;
        setTimeout(() => {
          this.loadEventsToHTML();
          this.showAllEvents();
          this.displayAddModal = false;
        }, delayInMilliseconds);

        // 2nd LOAD
        setTimeout(() => {
          this.loadEventsToHTML();
          this.showAllEvents();
        }, delayInMilliseconds);
      }
    },

    // Make axios call, store response to events[],
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

    showAllEvents() {
      this.displayEvents = this.events;
      console.log("COPY FROM events TO displayEvents");
    },
    showMeetingEvents() {
      this.displayEvents = this.events.filter(
        (event) => event.eventType === "Meeting"
      );
      console.log("FILTER MEETINGS FROM events TO displayEvents");
    },
    showDeadlineEvents() {
      this.displayEvents = this.events.filter(
        (event) => event.eventType === "Deadline"
      );
      console.log("FILTER DEADLINES FROM events TO displayEvents");
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

    // CALL LOAD()\ TWICE
    {
      // 0.5 SEC DELAY INTO RELOAD
      const delayInMilliseconds = 500;
      setTimeout(() => {
        this.showAllEvents();
      }, delayInMilliseconds);

      // 2nd LOAD
      setTimeout(() => {
        this.showAllEvents();
      }, delayInMilliseconds);
    }
    console.log("FROM events.js mounted(), loadEventsToHTML() CALLED.");
  },
});
