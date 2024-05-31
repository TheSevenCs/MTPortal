clientsApp.component("component-client", {
  props: ["client"],
  template:
    /*html*/
    `
    
    `,
  data() {
    return {
      displayModal: false,
      isEditing: false,

      // EDITING PROPERTIES
      editClientName: this.client.clientName,
      editClientDate: this.client.clientDate,
      editClientEmail: this.client.clientEmail,
      editClientPhone: this.client.clientPhoneNumber,
      editClientWebsite: this.client.clientWebsite,
      editClientType: this.client.clientAddress,
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
    },
    resetEdits() {
      this.editClientName = this.client.clientName;
    },

    componentDeleteComponent() {},
    componentSaveChanges() {},
  },
  computed: {
    deleteString() {
      return "/deleteClient?clientID=" + this.client.clientID;
    },
    editedString() {
      return (
        "/editClient?editedName=" +
        this.editClientDateClientName +
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
        this.editClientStatus
      );
    },
  },
});
