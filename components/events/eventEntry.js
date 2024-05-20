eventsApp.component("component-event", {
  props: ["event"],
  template:
    /*html*/
    `
    <div class="event" :style="{ border: '2px solid ' + borderColor }" >
        <p class="text-event-title">{{ event.eventName }}</p>
        <div class="text-event-date">Date: {{ event.eventDate }}</div>
        <p class="text-event-desc">Desc.: {{ event.eventDesc }}</p> 
        <button class="button-expand text-button-filter button-wrapper" @click="toggleModal">...</button>
    </div>
    <!-- MODAL ON CLICK -->
    <div class="modal" v-if="displayModal" @click.self="toggleModal">
        <div class="modal-container" @click="">
            <!-- DISPLAY INFO HERE -->
            <p class="text-event-title">{{ event.eventName }}</p>
            <div class="text-event-date">Date: {{ event.eventDate }}</div>
            <p class="text-event-desc">Desc.: {{ event.eventDesc }}</p>

            <!-- MANAGE/DELETE EVENT -->
            <button class="button-filter text-button-filter button-wrapper" style="right: 54.17vw;bottom:17vh;margin-top:2vh">Edit Event</button>
            <button class="button-filter text-button-filter button-wrapper" style="right: 33.3vw;bottom:17vh;margin-top:2vh">Delete Event</button>

            <button
              class="btn-wrapper"
              style="width: 28px; left:50%; top:50%"
              @click="toggleModal"
            >
              <img
                class="button-wrapper"
                style="
                  width: 28px;
                  background-color: white;
                  border: 1px solid white;
                  border-radius: 4px;
                  box-shadow: 2.1px 4.2px 4.2px hsl(0deg 0% 0% / 0.44);
                "
                src="images/exit-btn.png"
                alt="X"
              />
            </button>
        </div>
    </div>
    `,
  data() {
    return {
      displayModal: false,
    };
  },
  methods: {
    toggleModal() {
      //   this.$emit("toggleModal");
      this.displayModal = !this.displayModal;
    },
    selectEvent() {
      this.eventSelected = !this.eventSelected;
      this.borderColor = this.eventSelected ? "#FF0000" : "white";
    },
  },
});
