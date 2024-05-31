const clientsApp = Vue.createApp({
  data() {
    return {
      // { id: 1, dates: "02/11/2024", name: "george" },
      //   { id: 2, dates: "03/10/2024", name: "john" },
      //   { id: 3, dates: "05/20/2024", name: "james" },
      // clientData: {
      //   email: "fake@gmail.com",
      //   phoneNumber: "5195195191",
      //   website: "NON-APPLICABLE",
      //   address: "1213 Western Street",
      //   type: "Restaurant",
      //   status: "Contracted",
      // },

      clients: [],
      displayClients: [],

      newClientName: "",
      newClientDate: "",
      newClientEmail: "",
      newClientPhoneNumber: "",
      newClientWebsite: "",
      newClientAddress: "",
      newClientType: "",
      newClientStatus: "",

      displayAddModal: false,
    };
  },
  methods: {
    toggleAddModal() {
      this.displayAddModal = !this.displayAddModal;
    },

    addNewClient() {
      axios
        .post(this.addString)
        .then((response) => {
          console.log("Client added successfully:", response.data);
          // Additional handling if needed
        })
        .catch((error) => {
          console.error("Error adding Client:", error);
        });

      // RESET VARIABLES
      {
        this.newClientName = "";
        this.newClientDate = "";
        this.newClientEmail = "";
        this.newClientPhoneNumber = "";
        this.newClientWebsite = "";
        this.newClientAddress = "";
        this.newClientType = "";
        this.newClientStatus = "";
      }

      // DELAY THEN LOAD
      this.displayAddModal = false;
      const delayInMilliseconds = 300;
      setTimeout(() => {
        this.loadClientsToHTML();
        setTimeout(() => {
          this.showAllEvents();
        }, delayInMilliseconds);
      }, delayInMilliseconds);
    },
    async loadClientsToHTML() {
      // Make axios call, store response to clients[],
      try {
        const response = await axios.get("/getClients");
        this.clients = response.data;
        console.log("FROM loadClientsToHTML: ", response.data);
        // Handle response data as needed
      } catch (error) {
        console.error("Error during retrieval:", error);
        // Handle errors if needed
      }
    },

    // FILTERING METHODS
    showAllClients() {
      this.displayClients = this.clients;
      console.log("COPY FROM clients TO displayClients.");
    },

    // OLD METHODS
    // handleClientClick(clientId) {
    //   this.displayModal = true;
    // },
    // exitModal() {
    //   this.displayModal = false;
    // },
    // updateClientData(data) {
    //   this.clientData.email = data.localEmail;
    //   this.clientData.phonenumber = data.localPhonenumber;
    //   this.clientData.website = data.localWebsite;
    //   this.clientData.address = data.localAddress;
    //   this.clientData.type = data.localType;
    //   this.clientData.status = data.localStatus;
    // },
  },
  computed: {
    addString() {
      return (
        "/addClient?newName=" +
        this.newClientName +
        "&newDate=" +
        this.newClientDate +
        "&newEmail=" +
        this.newClientEmail +
        "&newPhoneNumber=" +
        this.newClientPhoneNumber +
        "&newWebsite=" +
        this.newClientWebsite +
        "&newAddress=" +
        this.newClientAddress +
        "&newType=" +
        this.newClientType +
        "&newStatus=" +
        this.newClientStatus
      );
    },
  },
  mounted() {
    this.loadClientsToHTML();

    // 0.3 SEC DELAY INTO RELOAD
    const delayInMilliseconds = 300;
    setTimeout(() => {
      this.showAllClients();
    }, delayInMilliseconds);
  },
});
