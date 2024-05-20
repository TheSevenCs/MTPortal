application.component("message", {
  props: {
    message: {
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
            <span class="username">{{message.username}}</span>
            <p class="">{{message.messageContent}}</p>
          </div>
        </div>
    `,
});
app.mount("#client");
