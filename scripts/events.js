const eventsApp = Vue.createApp({
  data() {
    return {
      events: [
        {
          eventName: "long description tester inside the modal",
          eventDate: "Today",
          eventType: "Meeting",
          eventDesc:
            "Description for Event1. Random text for testing how long the text box should be and how im going to wrap the text around this is so fun ha ha ha im really mentally stable guys i promise but if the text keeps on going then we are going ot have a bit of a problem on our hands am i right guys its almost like those 56%ers if you catch my drift he he he so now you can see that it goes up until it reaches the next event component Description for Event1. Random text for testing how long the text box should be and how im going to wrap the text around this is so fun ha ha ha im really mentally stable guys i promise but if the text keeps on going then we are going ot have a bit of a problem on our hands am i right guys its almost like those 56%ers if you catch my drift he he he so now you can see that it goes up until it reaches the next event component Description for Event1. Random text for testing how long the text box should be and how im going to wrap the text around this is so fun ha ha ha im really mentally stable guys i promise but if the text keeps on going then we are going ot have a bit of a problem on our hands am i right guys its almost like those 56%ers if you catch my drift he he he so now you can see that it goes up until it reaches the next event component Description for Event1. Random text for testing how long the text box should be and how im going to wrap the text around this is so fun ha ha ha im really mentally stable guys i promise but if the text keeps on going then we are going ot have a bit of a problem on our hands am i right guys its almost like those 56%ers if you catch my drift he he he so now you can see that it goes up until it reaches the next event component",
        },
        {
          eventName: "eventName2",
          eventDate: "Tomorrow",
          eventType: "Meeting",
          eventDesc: "Description for Event2.",
        },
        {
          eventName: "eventName3",
          eventDate: "The day after",
          eventType: "Meeting",
          eventDesc: "Description for Event3.",
        },
        {
          eventName: "eventName4",
          eventDate: "1/4/2024",
          eventType: "Meeting",
          eventDesc: "Description for Event4.",
        },
        {
          eventName: "eventName5",
          eventDate: "1/5/2024",
          eventType: "Meeting",
          eventDesc: "Description for Event5.",
        },
        {
          eventName: "eventName6",
          eventDate: "1/6/2024",
          eventType: "Meeting",
          eventDesc: "Description for Event6.",
        },
      ],
      newEventName: "",
      newEventDate: "",
      newEventType: "",
      newEventDesc: "",
      displayAddModal: false,
    };
  },

  methods: {
    addNewEvent(newName, newDate, newType, newDesc) {
      const newEvent = {
        eventName: newName,
        eventDate: newDate,
        eventType: newType,
        eventDesc: newDesc,
      };

      // ADD TO ARRAY
      this.events.push(newEvent);

      // RESET VARIABLES
      this.newEventName = "";
      this.newEventDate = "";
      this.newEventType = "";
      this.newEventDesc = "";
      this.displayAddModal = false;
    },
    toggleAddModal() {
      this.displayAddModal = !this.displayAddModal;
    },
  },
});
