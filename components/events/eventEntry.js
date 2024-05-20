eventsApp.component("component-event", {
  props: ["event"],
  template:
    /*html*/
    `
    <div class="event button-wrapper" :style="{ border: '2px solid ' + borderColor }" @click = "selectEvent">
        <p class="text-event-title">{{ event.eventName }}</p>
        <div class="text-event-date">Date: {{ event.eventDate }}</div>
        <p class="text-event-desc">Desc.: {{ event.eventDesc }}</p> 
    </div>
    `,
  data() {
    return {
      eventSelected: false,
      borderColor: "red solid",
    };
  },
  methods: {
    selectEvent() {
      this.eventSelected = true;
    },
  },
});
