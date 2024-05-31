clientsApp.component("client", {
  props: {
    clientname: {
      type: String,
      required: true,
    },
    clientdate: {
      type: String,
      required: true,
    },
    clientid: {
      type: Number,
      required: true,
    },
  },
  template:
    /*html*/
    `
      <button class="client" @click="handleClick">
        <div class="client-name button-wrapper">{{ clientname }}</div>
        <div class="client-date button-wrapper">{{ clientdate }}</div>
      </button>
  `,
  methods: {
    handleClick() {
      this.$emit("client-clicked", this.clientid);
    },
  },
});
