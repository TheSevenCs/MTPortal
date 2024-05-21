app.component("message", {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  template: `
    <div class="message">
      <div class="avatar">
        <img :src="message.avatarPath" alt="profile picture" />
      </div>
      <div class="message-content">
        <span class="username">{{ message.username }}</span>
        <p>{{ message.messageContent }}</p>
      </div>
    </div>
  `,
});
app.mount("#chatpage");
