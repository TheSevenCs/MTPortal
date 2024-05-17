const cesarGil = Vue.createApp({
  data() {
    return {
      events: [
        {
          eventName: "eventName1",
          eventDate: "Today",
          eventDesc: "Description for Event1.",
        },
        {
          eventName: "eventName2",
          eventDate: "Tomorrow",
          eventDesc: "Description for Event2.",
        },
        {
          eventName: "eventName3",
          eventDate: "The day after",
          eventDesc: "Description for Event3.",
        },
      ],
    };
  },

  methods: {},
});
