chatApp.component("component-message", {
  props: ["message"],
  template:
    /*html*/
    `
    <div class="message">
      <div class="avatar"><img :src="message.avatarPath" alt="profile picture" /></div>
      <div class="message-content">
        <span class="username">{{ message.username }}</span>
        <p>{{ message.messageContent }}</p>
      </div>
      <button class="button-expand text-button-filter button-wrapper" @click="" style="bottom: 35%; right: 6.25%">...</button>    
    </div>
    `,
  data() {
    return {};
  },
});
