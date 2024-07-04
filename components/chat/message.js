chatApp.component("component-message", {
  props: ["message"],
  template:
    /*html*/
    `
  <div class="modal" v-if="displayModal" @click.self="toggleModal">
    <div class="modal-chat">
      <button class="button-icon text-button-filter button-wrapper" @click="toggleModal" style="top: 5%; right: 6.25%">X</button>   
      
      <div v-if="isEditing">
        <input class="messageEditor" v-model="editMessageContent"/>

        <button class="button-filter text-button-filter button-wrapper" @click="toggleEditing" style="bottom:5%; left:15%">Cancel Changes</button>
        <button class="button-filter text-button-filter button-wrapper" @click="componentSaveChanges" style="bottom:5%; right:15%">Save Changes</button>

      </div>
      <div v-else>
        <div class="avatar"><img :src="message.messageAvatar" alt="pfp" /></div>
        <div class="message-content">
          <span class="username">{{ message.messageUsername }}</span>
          <span class="date">{{message.messageDate}}</span>
          <p>{{ message.messageContent }}</p>
        </div> 
        <button class="button-filter text-button-filter button-wrapper" @click="toggleEditing" style="bottom:5%; left:15%">Edit Message</button>
        <button class="button-filter text-button-filter button-wrapper" @click="componentDeleteMessage" style="bottom:5%; right:15%">Delete Message</button>
      </div>
    </div>
  </div>

    <div class="container-message">
      <div class="avatar"><img :src="message.messageAvatar" alt="pfp" /></div>
      <div class="message-content">
        <span class="username">{{ message.messageUsername }}</span>
        <span class="date">{{message.messageDate}}</span>
        <p>{{ message.messageContent }}</p>
      </div> 
      <button class="button-message text-button-filter button-wrapper" @click="toggleModal" style="bottom: 35%; right: 6.25%">...</button>   
    </div>
    `,
  data() {
    return {
      displayModal: false,
      isEditing: false,

      editMessageContent: "", // this attribute initialised on edit
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
      this.editMessageContent = this.message.messageContent;
    },
    resetEdits() {
      this.editMessageContent = "";
    },

    // DATABASE FUNCTIONS
    componentDeleteMessage() {
      axios
        .delete("/messages", {
          params: {
            tableName: "Messages",
            message_id: this.message.message_id,
          },
        })
        .then((response) => {
          console.log("Message DELETED SUCCESSFULLY: ", response.data);
        })
        .catch((error) => {
          console.error("ERROR DELETING Message: ", error);
        });

      // DELAY THEN UPDATE COUNTER
      const delayInMilliseconds = 300;
      setTimeout(() => {
        axios
          .post(
            "/change",
            {},
            {
              params: {
                table: "Messages",
              },
            }
          )
          .then((response) => {
            console.log("Counter UPDATED SUCCESSFULLY: ", response.data);
          })
          .catch((error) => {
            console.error("FROM message.js, ERROR UPDATING Counter: ", error);
          });
      }, delayInMilliseconds);

      // CONTINUOUS LOAD FROM APPLICATION WILL AUTO UPDATE LOGS
      this.toggleModal();
    },
    componentSaveChanges() {
      axios
        .patch(
          "/messages",
          {},
          {
            params: {
              message_id: this.message.message_id,
              editedMessage: this.editMessageContent,
            },
          }
        )
        .then((response) => {
          console.log("Message EDITED SUCCESSFULLY: ", response.data);
        })
        .catch((error) => {
          console.error("ERROR EDITING Message: ", error);
        });

      // DELAY THEN UPDATE COUNTER
      const delayInMilliseconds = 300;
      setTimeout(() => {
        axios
          .post(
            "/change",
            {},
            {
              params: {
                table: "Messages",
              },
            }
          )
          .then((response) => {
            console.log("Counter UPDATED SUCCESSFULLY: ", response.data);
          })
          .catch((error) => {
            console.error("FROM message.js, ERROR UPDATING Counter: ", error);
          });
      }, delayInMilliseconds);

      // CLOSE MODAL AFTER
      this.toggleModal();
    },
  },
});
