app.component("message", {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  template:
    /*html*/
    `
    <div class="message">
      <div class="avatar">
        <img :src="message.avatarPath" alt="profile picture" />
      </div>
      <div class="message-content">
        <span class="username">{{ message.username }}</span>
        <p>{{ message.messageContent }}</p>
      </div>
      <button
        class="button-expand text-button-filter button-wrapper"
        style="bottom: 35%; right: 6.25%"
        @click=""
      >
        ...
      </button>    
    </div>
    `,
});
app.mount("#chatpage");
