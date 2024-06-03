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
          this.showCurrentClients();
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
    showCurrentClients() {
      this.displayClients = this.clients.filter(
        (client) => client.clientStatus === "Current"
      );
      console.log("FILTER Current FROM clients TO displyClients");
    },
    showPotentialClients() {
      this.displayClients = this.clients.filter(
        (client) => client.clientStatus === "Potential"
      );
      console.log("FILTER Potential FROM clients TO displyClients");
    },
    showPastClients() {
      this.displayClients = this.clients.filter(
        (client) => client.clientStatus === "Past"
      );
      console.log("FILTER Past FROM clients TO displyClients");
    },
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
      this.showCurrentClients();
    }, delayInMilliseconds);
  },
});
