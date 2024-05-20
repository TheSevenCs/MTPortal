const app = Vue.createApp({
  data() {
    return {
      clients: [
        { id: 1, dates: "02/11/2024", name: "george" },
        { id: 2, dates: "03/10/2024", name: "john" },
        { id: 3, dates: "05/20/2024", name: "james" },
      ],
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
  },
});
