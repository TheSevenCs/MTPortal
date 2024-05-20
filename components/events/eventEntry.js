eventsApp.component("component-event", {
  props: ["event"],
  template:
    /*html*/
    `
    <div class="event" @click = "selectEvent">
        <h2>{{ event.eventName }}<br></h2>
        <p>Date: {{ event.eventDate }}<br><br></p>
        <p>Desc.: {{ event.eventDesc }}</p> 
    </div>
    `,
  data() {
    return {
      eventSelected: false,
    };
  },
  methods: {
    selectEvent() {
      this.eventSelected = true;
    },
  },
});
