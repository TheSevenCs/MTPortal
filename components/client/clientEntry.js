clientsApp.component("component-client", {
  props: ["client"],
  template:
    /*html*/
    `
    <button class="client" @click="toggleModal">
      <div class="client-name button-wrapper">{{ client.clientName }}</div>
      <div class="client-date button-wrapper">{{ client.clientDate }}</div>
    </button>

    <div class="modal" v-if="displayModal" @click.self="toggleModal">
        <div class="modal-container">
          <!-- EXIT X BUTTON -->
          <div>
            <button class="btn-wrapper" @click="toggleModal" style="width: 28px; margin-left: 1070%; margin-top: -20%">
              <img class="button-wrapper" src="images/exit-btn.png" alt="X" style="width: 28px; background-color: white; border: 1px solid white; border-radius: 4px; box-shadow: 2.1px 4.2px 4.2px hsl(0deg 0% 0% / 0.44);"/>
            </button>
          </div>

          <!-- EDIT BUTTON -->
          <div>
            <button class="btn-wrapper" @click="toggleEditing" title="Edit Client Data" style="width: 28px; margin-left: 910%; margin-top: -20%">
              <img class="button-wrapper" src="images/edit-btn.png" alt="X" style="width: 26px; background-color: white; border: 1px solid white; border-radius: 4px; box-shadow: 2.1px 4.2px 4.2px hsl(0deg 0% 0% / 0.44);"/>
            </button>
          </div>

          <!-- IF IS EDITING -->
          <div v-if="isEditing">
            <div class="modal-box-title modal-grid-item-1">Name</div>
            <input class="info-box name-box" v-model="editClientName" />

            <div class="modal-box-title modal-grid-item-2">Date</div>
            <input type="date" class="info-box date-box" v-model="editClientDate" />

            <div class="modal-box-title modal-grid-item-3">Email</div>
            <input class="info-box email-box" v-model="editClientEmail" />

            <div class="modal-box-title modal-grid-item-4">Phone Number</div>
            <input class="info-box number-box" v-model="editClientPhoneNumber" />

            <div class="modal-box-title modal-grid-item-5">Website</div>
            <input class="info-box web-box" v-model="editClientWebsite" />

            <div class="modal-box-title modal-grid-item-6">Address</div>
            <input class="info-box address-box" v-model="editClientAddress" />

            <div class="modal-box-title modal-grid-item-7">Business Type</div>
            <input class="info-box business-box" v-model="editClientType" />

            <div class="modal-box-title modal-grid-item-8">Status</div>
            <select class="info-box status-box" v-model="editClientStatus">
              <option>Current</option> 
              <option>Potential</option> 
              <option>Past</option> 
            </select>
            

            <!-- EDIT CLIENT BUTTON -->
            <button @click="toggleEditing" class="button-filter text-button-filter button-wrapper" style="left: 16.6%; bottom: 4%; margin-top: 2vh; width: 25%">
              Cancel Edits
            </button>
          
            <!-- DELETE CLIENT BUTTON -->
            <button @click="componentSaveChanges" class="button-filter text-button-filter button-wrapper" style="right:16.6%; bottom: 4%; margin-top: 2vh; width: 25%">
              Save Changes
            </button>
          </div>
          <!-- ELSE ONLY DISPLAY -->
          <div v-else>
            <div class="modal-box-title modal-grid-item-1">Name</div>
            <input readonly class="info-box name-box" v-model="editClientName" />

            <div class="modal-box-title modal-grid-item-2">Date</div>
            <input readonly class="info-box date-box" v-model="editClientDate" />

            <div class="modal-box-title modal-grid-item-3">Email</div>
            <input readonly class="info-box email-box" v-model="editClientEmail" />

            <div class="modal-box-title modal-grid-item-4">Phone Number</div>
            <input readonly class="info-box number-box" v-model="editClientPhoneNumber" />

            <div class="modal-box-title modal-grid-item-5">Website</div>
            <input readonly class="info-box web-box" v-model="editClientWebsite" />

            <div class="modal-box-title modal-grid-item-6">Address</div>
            <input readonly class="info-box address-box" v-model="editClientAddress" />

            <div class="modal-box-title modal-grid-item-7">Business Type</div>
            <input readonly class="info-box business-box" v-model="editClientType" />

            <div class="modal-box-title modal-grid-item-8">Status</div>
            <input readonly class="info-box status-box" v-model="editClientStatus" />
            
            <!-- EDIT CLIENT BUTTON -->
            <button @click="toggleEditing" class="button-filter text-button-filter button-wrapper" style="left: 16.6%; bottom: 4%; margin-top: 2vh; width: 25%">
              Edit Client
            </button>
          
            <!-- DELETE CLIENT BUTTON -->
            <button @click="componentDeleteComponent" class="button-filter text-button-filter button-wrapper" style="right:16.6%; bottom: 4%; margin-top: 2vh; width: 25%">
              Delete Client
            </button>
          </div>
          
        </div>
      </div>



    `,
  data() {
    return {
      displayModal: false,
      isEditing: false,

      // EDITING PROPERTIES
      editClientName: this.client.clientName,
      editClientDate: this.client.clientDate,
      editClientEmail: this.client.clientEmail,
      editClientPhoneNumber: this.client.clientPhoneNumber,
      editClientWebsite: this.client.clientWebsite,
      editClientAddress: this.client.clientAddress,
      editClientType: this.client.clientType,
      editClientStatus: this.client.clientStatus,
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
      this.resetEdits();
    },
    resetEdits() {
      this.editClientName = this.client.clientName;
      this.editClientDate = this.client.clientDate;
      this.editClientEmail = this.client.clientEmail;
      this.editClientPhoneNumber = this.client.clientPhoneNumber;
      this.editClientWebsite = this.client.clientWebsite;
      this.editClientAddress = this.client.clientAddress;
      this.editClientType = this.client.clientType;
      this.editClientStatus = this.client.clientStatus;
    },

    componentDeleteComponent() {
      console.log("deleteString: ", this.deleteString);
      axios
        .delete(this.deleteString)
        .then((response) => {
          console.log("Client deleted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error deleting Client:", error);
        });

      // DELAY THEN LOAD
      this.toggleModal();
      const delayInMilliseconds = 300;
      setTimeout(() => {
        this.$parent.loadClientsToHTML();
        setTimeout(() => {
          this.$parent.showAllClients();
        }, delayInMilliseconds);
      }, delayInMilliseconds);
    },
    componentSaveChanges() {
      axios
        .post(this.editedString)
        .then((response) => {
          console.log("Client EDITED SUCCESSFULLY: ", response.data);
          // Additional handling if needed
        })
        .catch((error) => {
          console.error("ERROR EDITING Client: ", error);
        });

      // DELAY THEN LOAD
      this.toggleModal();
      const delayInMilliseconds = 300;
      setTimeout(() => {
        this.$parent.loadClientsToHTML();
        setTimeout(() => {
          this.$parent.showAllClients();
        }, delayInMilliseconds);
      }, delayInMilliseconds);
    },
  },
  computed: {
    deleteString() {
      return "/deleteClient?clientID=" + this.client.clientID;
    },
    editedString() {
      return (
        "/editClient?editedName=" +
        this.editClientName +
        "&editedDate=" +
        this.editClientDate +
        "&editedEmail=" +
        this.editClientEmail +
        "&editedPhoneNumber=" +
        this.editClientPhoneNumber +
        "&editedWebsite=" +
        this.editClientWebsite +
        "&editedAddress=" +
        this.editClientAddress +
        "&editedType=" +
        this.editClientType +
        "&editedStatus=" +
        this.editClientStatus +
        "&editedID=" +
        this.client.clientID
      );
    },
  },
});
