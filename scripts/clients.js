const clientsApp = Vue.createApp({
  data() {
    return {
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
      currentFilter: "Current",
    };
  },
  methods: {
    // MODAL FUNCTIONS
    toggleAddModal() {
      this.displayAddModal = !this.displayAddModal;
    },

    // DATABASE FUNCTIONS
    addNewClient() {
      axios
        .post(
          "/client",
          {},
          {
            params: {
              newName: this.newClientName,
              newDate: this.newClientDate,
              newEmail: this.newClientEmail,
              newPhoneNumber: this.newClientPhoneNumber,
              newWebsite: this.newClientWebsite,
              newAddress: this.newClientAddress,
              newType: this.newClientType,
              newStatus: this.newClientStatus,
            },
          }
        )
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
          this.showByFilter();
        }, delayInMilliseconds);
      }, delayInMilliseconds);
    },
    async loadClientsToHTML() {
      // Make axios call, store response to clients[],
      try {
        const response = await axios.get("/client");
        this.clients = response.data;
        console.log("FROM loadClientsToHTML: ", response.data);
        // Handle response data as needed
      } catch (error) {
        console.error("Error during retrieval:", error);
        // Handle errors if needed
      }
    },

    // FILTERING METHODS
    showByFilter() {
      this.displayClients = this.clients.filter(
        (client) => client.clientStatus === this.currentFilter
      );
      console.log(
        "FILTER" + this.currentFilter + " FROM clients TO displyClients"
      );
    },
    showCurrentClients() {
      this.currentFilter = "Current";
      this.showByFilter();
    },
    showPotentialClients() {
      this.currentFilter = "Potential";
      this.showByFilter();
    },
    showPastClients() {
      this.currentFilter = "Past";
      this.showByFilter();
    },
  },
  mounted() {
    this.loadClientsToHTML();

    // 0.3 SEC DELAY INTO RELOAD
    const delayInMilliseconds = 300;
    setTimeout(() => {
      this.showByFilter();
    }, delayInMilliseconds);
  },
});
