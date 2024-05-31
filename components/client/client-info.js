clientsApp.component("client-info", {
  props: {
    email: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    displayModal: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="modal" v-if="displayModal" @click.self="modalClosed">
        <div class="modal-container">
          <div>
            <button
              class="btn-wrapper"
              style="width: 28px; margin-left: 1070%; margin-top: -20%"
              @click="modalClosed"
            >
              <img
                class="button-wrapper"
                style="
                  width: 28px;
                  background-color: white;
                  border: 1px solid white;
                  border-radius: 4px;
                  box-shadow: 2.1px 4.2px 4.2px hsl(0deg 0% 0% / 0.44);
                "
                src="images/exit-btn.png"
                alt="X"
              />
            </button>
          </div>
          <div>
            <button
              class="btn-wrapper" title="Edit Client Data"
              style="width: 28px; margin-left: 910%; margin-top: -20%"
              @click="toggleEdit"
            >
              <img
                class="button-wrapper"
                style="
                  width: 26px;
                  background-color: white;
                  border: 1px solid white;
                  border-radius: 4px;
                  box-shadow: 2.1px 4.2px 4.2px hsl(0deg 0% 0% / 0.44);
                "
                src="images/edit-btn.png"
                alt="X"
              />
            </button>
          </div>
          <div class="modal-box-title modal-grid-item-1">Email</div>
          <div v-if="!editing" class="info-box email-box">{{localEmail}}</div>
          <input 
            v-else 
            class="info-box email-box" 
            type="text" 
            :placeholder="email" 
            v-model="localEmail" 
            @blur="finishEditing" 
            ref="inputField"
          />

          <div class="modal-box-title modal-grid-item-2">Phone Number</div>
          <div v-if="!editing" class="info-box number-box">{{localPhonenumber}}</div>
          <input 
            v-else 
            class="info-box number-box" 
            type="text" 
            :placeholder="phonenumber" 
            v-model="localPhonenumber" 
            @blur="finishEditing" 
            ref="inputField"
          />

          <div class="modal-box-title modal-grid-item-3">Website</div>
          <div v-if="!editing" class="info-box web-box">{{localWebsite}}</div>
          <input 
            v-else 
            class="info-box web-box" 
            type="text" 
            :placeholder="website" 
            v-model="localWebsite" 
            @blur="finishEditing" 
            ref="inputField"
          />

          <div class="modal-box-title modal-grid-item-4">Address</div>
          <div v-if="!editing" class="info-box address-box">{{localAddress}}</div>
          <input 
            v-else 
            class="info-box address-box" 
            type="text" 
            :placeholder="address" 
            v-model="localAddress" 
            @blur="finishEditing" 
            ref="inputField"
          />

          <div class="modal-box-title modal-grid-item-5">Business Type</div>
          <div  v-if="!editing" class="info-box business-box">{{localType}}</div>
          <input 
            v-else 
            class="info-box business-box" 
            type="text" 
            :placeholder="type" 
            v-model="localType" 
            @blur="finishEditing" 
            ref="inputField"
          />

          <div class="modal-box-title modal-grid-item-6">Status</div>
          <div  v-if="!editing" class="info-box status-box">{{localStatus}}</div>
          <input 
            v-else 
            class="info-box status-box" 
            type="text" 
            :placeholder="status" 
            v-model="localStatus" 
            @blur="finishEditing" 
            ref="inputField"
          />
        </div>
      </div>
    `,
  data() {
    return {
      editing: false,
      localEmail: this.email,
      localPhonenumber: this.phonenumber,
      localWebsite: this.website,
      localAddress: this.address,
      localType: this.type,
      localStatus: this.status,
    };
  },
  methods: {
    modalClosed() {
      this.$emit("modal-closed");
    },
    toggleEdit() {
      this.editing = !this.editing;
    },
    finishEditing() {
      this.editing = false;
      this.$emit("edits", {
        localEmail: this.localEmail,
        localPhonenumber: this.localPhonenumber,
        localWebsite: this.localWebsite,
        localAddress: this.localAddress,
        localType: this.localType,
        localStatus: this.localStatus,
      });
    },
  },
});
