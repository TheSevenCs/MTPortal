const app = Vue.createApp({
  data() {
    return {
      displayModal: false,
    };
  },
  methods: {
    handleProfileClick() {
      this.displayModal = true;
    },
    exitModal() {
      this.displayModal = false;
    },
    changeAvatar(){
    },
    changeEmail(){

    },
  },
});
