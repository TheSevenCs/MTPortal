eventsApp.component("component-event", {
  props: ["event"],
  template:
    /*html*/
    `
    <div class="event" style="visibility: {{ displayStatus }}">
        <p class="text-event-title">{{ event.eventName }}</p>
        <div class="text-event-date">{{ event.eventType }} Date: {{ event.eventDate }}</div>
        <p class="text-event-desc">Desc.: {{ event.eventDesc }}</p> 
        <button class="button-expand text-button-filter button-wrapper" @click="toggleModal">...</button>
    </div>
    <!-- MODAL ON CLICK -->
    <div class="modal" v-if="displayModal" @click.self="toggleModal" style="overflow-y: hidden"> <!-- @click.self for binding function only to this element, and not the children elements -->
        <div class="modal-event-container">
            <!-- DISPLAY INFO HERE -->
            <p class="text-event-title" style="max-width: 88.5%;max-height: 15%; margin-top: 1vh">{{ event.eventName }}</p>
            <div class="text-event-date" style="display: block; text-align:left; left: 25vw; margin-left: 1.5vh; margin-top: 0; max-width:45vw">{{ event.eventType }} Date: {{ event.eventDate }}</div>
            <p class="text-event-desc" style="margin-top:5vh; margin-left:1.5vh; max-width:50vw; max-height: 39vh">Desc.: {{ event.eventDesc }}</p>

            <!-- MODAL MANAGE/DELETE EVENT -->
            <button @click="" class="button-filter text-button-filter button-wrapper" style="right: 54.17vw;bottom:17vh;margin-top:2vh">Edit Event</button>
            <button @click="componentDeleteEvent" class="button-filter text-button-filter button-wrapper" style="right: 33.3vw;bottom:17vh;margin-top:2vh">Delete Event</button>

            <!-- MODAL EXIT -->
            <button class="button-expand text-button-filter button-wrapper" @click="toggleModal" style="padding-bottom: 0; top: 17vh; right: 25.5vw;">X</button>
        </div>
    </div>
    `,
  data() {
    return {
      componendID: this.event.eventID,
      displayModal: false,
    };
  },
  methods: {
    toggleModal() {
      this.displayModal = !this.displayModal;
      console.log("FROM EVENT COMPONENT, TOGGLE MODAL CALLED.");
    },
    componentDeleteEvent() {
      axios
        .delete(this.deleteString)
        .then((response) => {
          console.log("Event deleted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error deleting event:", error);
        });

      // DELAY THEN LOAD
      this.toggleModal();
      const delayInMilliseconds = 300;
      setTimeout(() => {
        this.$parent.loadEventsToHTML();
        setTimeout(() => {
          this.$parent.showAllEvents();
        }, delayInMilliseconds);
      }, delayInMilliseconds);
    },
  },
  computed: {
    deleteString() {
      console.log(
        "FROM eventEntry.js, deleteString() CALLED, this.event.eventID: ",
        this.event.eventID
      );
      return "/Events?eventID=" + this.event.eventID;
    },
  },
});
