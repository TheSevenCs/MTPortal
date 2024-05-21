const app = Vue.createApp({
  data() {
    return {
      clients: [
        { id: 1, dates: "02/11/2024", name: "george" },
        { id: 2, dates: "03/10/2024", name: "john" },
        { id: 3, dates: "05/20/2024", name: "james" },
      ],
      clientData: {
        email: "fake@gmail.com",
        phoneNumber: "5195195191",
        website: "NON-APPLICABLE",
        address: "1213 Western Street",
        type: "Restaurant",
        status: "Contracted",
      },
      displayModal: false,
    };
  },
  methods: {
    handleClientClick(clientId) {
      this.displayModal = true;
    },
    exitModal() {
      this.displayModal = false;
    },
    updateClientData(data) {
      this.clientData.email = data.localEmail;
      this.clientData.phonenumber = data.localPhonenumber;
      this.clientData.website = data.localWebsite;
      this.clientData.address = data.localAddress;
      this.clientData.type = data.localType;
      this.clientData.status = data.localStatus;
    },
  },
});
