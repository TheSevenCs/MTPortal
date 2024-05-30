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
            <div v-if="isEditing">
                <!-- INPUT FIELDS Use v-model for text fields -->
                <div><p class="text-input-label" style="left: 45.5vw">Edit Event</p></div>

                <span class="text-input-label" style="top: 26vh">Event Name:</span>
                <input class="input-text" v-model="editEventName" style="top: 25vh" />

                <span class="text-input-label" style="top: 36vh">Event Date:</span>
                <input class="input-text" v-model="editEventDate" style="top: 35vh" />

                <span class="text-input-label" style="top: 46vh">Event Type:</span>
                <select class="input-text" v-model="editEventType" style="top: 45vh; height: 6.25vh; width: 28.75vw"> <option>Meeting</option> <option>Deadline</option> </select>

                <span class="text-input-label" style="top: 55vh">Event Desc:</span>
                <textarea class="input-text" v-model="editEventDesc" style=" top: 55vh; height: 12.5vh; width: 26.25vw; text-indent: 0; padding: 1vw; "></textarea>
            
                <button @click="componentSaveChanges" class="button-filter text-button-filter button-wrapper" style="right: 33.3vw;bottom:17vh;margin-top:2vh">Save Changes</button>
            </div>
            <div v-else>
                <p id="text1" class="text-event-title" style="max-width: 88.5%;max-height: 15%; margin-top: 1vh">{{ event.eventName }}</p>
                <div id="text2" class="text-event-date" style="display: block; text-align:left; left: 25vw; margin-left: 1.5vh; margin-top: 0; max-width:45vw">{{ event.eventType }} Date: {{ event.eventDate }}</div>
                <p id="text3" class="text-event-desc" style="margin-top:5vh; margin-left:1.5vh; max-width:50vw; max-height: 39vh">Desc.: {{ event.eventDesc }}</p>
            
                <button @click="componentDeleteEvent" class="button-filter text-button-filter button-wrapper" style="right: 33.3vw;bottom:17vh;margin-top:2vh">Delete Event</button>
            </div>
            <!-- MODAL MANAGE/DELETE EVENT -->
            <button @click="toggleEditing" class="button-filter text-button-filter button-wrapper" style="right: 54.17vw;bottom:17vh;margin-top:2vh">Edit Event</button>
            
            <!-- MODAL EXIT -->
            <button class="button-expand text-button-filter button-wrapper" @click="toggleModal" style="padding-bottom: 0; top: 17vh; right: 25.5vw;">X</button>
        </div>
    </div>
    `,
  data() {
    return {
      displayModal: false,
      isEditing: false,

      // new properties
      editEventName: this.event.eventName,
      editEventDate: this.event.eventDate,
      editEventType: this.event.eventType,
      editEventDesc: this.event.eventDesc,
    };
  },
  methods: {
    toggleModal() {
      this.displayModal = !this.displayModal;
      this.isEditing = false;
      this.resetEdits();
    },
    toggleEditing() {
      this.isEditing = !this.isEditing;
      console.log("this.isEditing STATUS: ", this.isEditing);
    },
    resetEdits() {
      // new properties
      this.editEventName = this.event.eventName;
      this.editEventDate = this.event.eventDate;
      this.editEventType = this.event.eventType;
      this.editEventDesc = this.event.eventDesc;
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
    componentSaveChanges() {
      axios
        .post(this.editedString)
        .then((response) => {
          console.log("Event EDITED SUCCESSFULLY: ", response.data);
          // Additional handling if needed
        })
        .catch((error) => {
          console.error("ERROR EDITING Event: ", error);
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
      // console.log(
      //   "FROM eventEntry.js, deleteString() CALLED, this.event.eventID: ",
      //   this.event.eventID
      // );
      return "/Events?eventID=" + this.event.eventID;
    },
    editedString() {
      return (
        "/editEvent?editedName=" +
        this.editEventName +
        "&editedDate=" +
        this.editEventDate +
        "&editedType=" +
        this.editEventType +
        "&editedDesc=" +
        this.editEventDesc +
        "&editedID=" +
        this.event.eventID
      );
    },
  },
});
