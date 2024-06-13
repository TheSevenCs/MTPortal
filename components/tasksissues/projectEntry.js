tasksissuesApp.component("component-project", {
  props: ["project"],
  emits: ["select-project"], // EMIT NAME OF EVENT
  template:
    /*html*/
    `
    <!-- PROJECT SIDEBAR ELEMENT -->
    <div class="project button-wrapper" @click="selectProject">
      <div style="cursor: pointer;">{{ project.projectName }}</div>
      <button class="button-icon text-button-filter button-wrapper" style="bottom: 5%; right: 0%; position:relative" @click="toggleAddModal">+</button>
      <button class="button-icon text-button-filter button-wrapper" style="bottom: 5%; right: 0%; margin-left:1vh; position:relative" @click="toggleInfoModal">...</button>
    </div>

    <!-- ADD TASK/ISSUE MODAL -->
    <div class="modal" v-if="displayAddModal" @click.self="toggleAddModal" style="z-index: 2">
      <div class="modal-container">
        <!-- ADD MODAL EXIT -->
        <button class="button-expand text-button-filter button-wrapper" @click="toggleAddModal" style="padding-bottom: 0; top: 2.5%; right: 2%">X</button>

        <!-- INPUT FIELDS -->
        <div><p class="text-input-label" style="left: 39.25%">Add Task/Issue</p></div>

        <span class="text-input-label" style="top: 15%; left: 4.5%">New Name:</span>
        <input class="input-text" v-model="newTIName" style="top: 13.5%; left: 33%"/>

        <span class="text-input-label" style="top: 27.5%; left: 4.5%">New Date:</span>
        <input type="date" class="input-text" v-model="newTIDate" style="top: 26%; left: 33%"/>

        <span class="text-input-label" style="top: 40%; left: 4.5%">New Type:</span>
        <select class="input-text" v-model="newTIType" style="top: 39%; left: 33%"><option>Task</option><option>Issue</option></select>

        <span class="text-input-label" style="top: 52.5%; left: 4.5%">New Status:</span>
        <input class="input-text" v-model="newTIStatus" style="top: 51%; left: 33%"/>

        <span class="text-input-label" style="top: 65%; left: 4.5%">New Desc:</span>
        <textarea id="addDesc" class="input-text" v-model="newTIDesc" style="top: 63.5%;left: 33%;height: 10vh;width: 26.25vw;text-indent: 0;padding: 1vw;"></textarea>
       
        <!-- ADD TASK/ISSUE BUTTON -->
        <button class="button-filter text-button-filter button-wrapper" @click="addNewTI" style="width: 25%; left: 37.5%; bottom: 2.5%">Create New Task/Issue</button>
      </div>
    </div>

    <!-- INFO MODAL -->
    <div class="modal" v-if="displayInfoModal" @click.self="toggleInfoModal" style="overflow-y: hidden"> <!-- @click.self for binding function only to this element, and not the children elements -->
      <div class="modal-container">
        <!-- DISPLAY INFO HERE -->
        <div v-if="isEditing">
          <!-- INPUT FIELDS Use v-model for text fields -->
          <div><p class="text-input-label" style="left: 39%">Edit Project</p></div>

          <span class="text-input-label" style="top:16%; left:2.5%">Project Name:</span>
          <input class="input-text" v-model="editProjectName" style="top:15%; left:33.5%"/>

          <span class="text-input-label" style="top:30%; left:2.5%">Project Client:</span>
          <input class="input-text" v-model="editProjectClient" style="top:29%; left:33.5%"/>

          <span class="text-input-label" style="top:44%; left:2.5%">Project Date:</span>
          <input type="date" class="input-text" v-model="editProjectDate" style="top:43%; left:33.5%"/>

          <span class="text-input-label" style="top:58%; left:2.5%">Project Desc:</span>
          <textarea class="input-text" v-model="editProjectDesc" style="top:57%; left:33.5%; height: 12.5vh; width:52%; text-indent:0; padding:1vw;"></textarea>
            
          <button @click="componentSaveChanges" class="button-filter text-button-filter button-wrapper" style="right:16.67%; bottom:3.5%; margin-top:2.5%">Save Changes</button>
        </div>
        <div v-else>
          <p id="text1" class="text-modal" style="max-width:88.5%; max-height:15%; top:2%">{{ project.projectName }}</p>
          <div id="text2" class="text-modal" style="font-size:4vh; top:15%; max-width:80%">Client: {{ project.projectClient }}<br>Date: {{ project.projectDate }}</div>
          <p id="text3" class="text-modal" style="top:35%; font-size:3vh;">Description:</p>
          <p id="text3" class="text-modal" style="top:45%; font-size:2vh; max-width:88.5%; max-height:40%;">{{ project.projectDesc }}</p>
            
          <button @click="componentDeleteComponent" class="button-filter text-button-filter button-wrapper" style="right:16.67%; bottom:3.5%; margin-top:2.5%">Delete Project</button>
        </div>
        <!-- MODAL MANAGE/DELETE EVENT -->
        <button @click="toggleEditing" class="button-filter text-button-filter button-wrapper" style="width:25%; left:16.67%; bottom:3.5%; margin-top:2.5%">Edit Project</button>
            
        <!-- MODAL EXIT -->
        <button class="button-expand text-button-filter button-wrapper" @click="toggleInfoModal" style="padding-bottom: 0; top: 2.5%; right: 2%;">X</button>
      </div>
    </div>
    `,
  data() {
    return {
      displayAddModal: false,
      displayInfoModal: false,
      isEditing: false,
      // selected: false, CAN USE LATER FOR INDICATOR

      editProjectName: "",
      editProjectClient: "",
      editProjectDate: "",
      editProjectDesc: "",

      newTIName: "",
      newTIDate: "",
      newTIType: "",
      newTITable: "",
      newTIStatus: "",
      newTIDesc: "",
    };
  },
  methods: {
    // MODAL FUNCTIONS
    toggleInfoModal() {
      this.displayInfoModal = !this.displayInfoModal;
      this.isEditing = false;
      this.resetEdits();
    },
    toggleAddModal() {
      this.displayAddModal = !this.displayAddModal;
      this.resetEdits();
    },
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    resetEdits() {
      this.editProjectName = this.project.projectName;
      this.editProjectClient = this.project.projectClient;
      this.editProjectDate = this.project.projectDate;
      this.editProjectDesc = this.project.projectDesc;
    },

    selectProject() {
      this.$emit("select-project", this.project.project_id);
      console.log("ID OF COMPONENT CLICKED: ", this.project.project_id);
    },

    // DATABASE FUNCTIONS
    componentDeleteComponent() {
      axios
        .delete("/project", {
          params: { project_id: this.project.project_id },
        })
        .then((response) => {
          console.log("Project DELETED SUCCESSFULLY: ", response.data);
        })
        .catch((error) => {
          console.error("ERROR DELETING Project: ", error);
        });

      // DELAY THEN LOAD TWICE
      this.toggleInfoModal();
      const delayInMilliseconds = 300;
      setTimeout(() => {
        this.$parent.loadProjectsToHTML();
        setTimeout(() => {
          this.$parent.loadProjectsToHTML();
        }, delayInMilliseconds);
      }, delayInMilliseconds);
    },
    componentSaveChanges() {
      axios
        .patch(
          "/project",
          {},
          {
            params: {
              editedName: this.editProjectName,
              editedClient: this.editProjectClient,
              editedDate: this.editProjectDate,
              editedDesc: this.editProjectDesc,
              project_id: this.project.project_id,
            },
          }
        )
        .then((response) => {
          console.log("Project EDITED SUCCESSFULLY: ", response.data);
        })
        .catch((error) => {
          console.error("ERROR EDITING Project: ", error);
        });

      // DELAY THEN LOAD
      this.toggleInfoModal();
      const delayInMilliseconds = 300;
      setTimeout(() => {
        this.$parent.loadProjectsToHTML();
        setTimeout(() => {
          this.$parent.loadProjectsToHTML();
        }, delayInMilliseconds);
      }, delayInMilliseconds);
    },

    addNewTI() {
      axios
        .post(
          "/task-issue",
          {},
          {
            params: {
              project_id: this.project.project_id,
              newTIType: this.newTIType + "s",
              newTIName: this.newTIName,
              newTIDate: this.newTIDate,
              newTIStatus: this.newTIStatus,
              newTIDesc: this.newTIDesc,
            },
          }
        )
        .then((response) => {
          console.log("Task/Issue ADDED SUCCESSFULY: ", response.data);
        })
        .catch((error) => {
          console.error("ERROR ADDING Task/Issue: ", error);
        });

      // RESET VARIABLES
      {
        this.newTIName = "";
        this.newTIDate = "";
        this.newTIType = "";
        this.newTIStatus = "";
        this.newTIDesc = "";
      }

      this.displayAddModal = false;
      const delayInMilliseconds = 300;
      setTimeout(() => {
        // this.loadProjectsToHTML(); || May want to consider an emit here to load the data to the arrays in the application????
        this.selectProject();
        setTimeout(() => {
          this.selectProject();
        }, delayInMilliseconds);
      }, delayInMilliseconds);
    },
  },
});
