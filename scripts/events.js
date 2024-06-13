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
      // selectedFilter: "",
    };
  },
  methods: {
    toggleAddModal() {
      this.displayAddModal = !this.displayAddModal;
    },

    addNewEvent() {
      axios
        .post(
          "/event",
          {},
          {
            params: {
              newName: this.newEventName,
              newDate: this.newEventDate,
              newType: this.newEventType,
              newDesc: this.newEventDesc,
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
      this.newEventName = "";
      this.newEventDate = "";
      this.newEventType = "";
      this.newEventDesc = "";

      // DELAY THEN LOAD
      this.displayAddModal = false;
      const delayInMilliseconds = 300;
      setTimeout(() => {
        this.loadEventsToHTML();
        setTimeout(() => {
          this.showAllEvents();
        }, delayInMilliseconds);
      }, delayInMilliseconds);
    },
    async loadEventsToHTML() {
      // Make axios call, store response to events[],
      try {
        const response = await axios.get("/event");
        this.events = response.data;
        console.log("FROM loadEventsToHTML: ", response.data);
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
  mounted() {
    this.loadEventsToHTML();

    // 0.3 SEC DELAY INTO RELOAD
    const delayInMilliseconds = 300;
    setTimeout(() => {
      this.showAllEvents();
    }, delayInMilliseconds);
  },
});
