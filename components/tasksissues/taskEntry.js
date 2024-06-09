tasksissuesApp.component("component-task", {
  props: ["task"],
  emits: ["select-project"], // EMIT NAME OF EVENT
  template:
    /*html*/
    `
    <div class="task"> 
      <span class="text-ti" style="font-size:275%; top:1%; left:1.5%; max-width:55%">{{ task.taskName }}</span>
      <span class="text-ti" style="font-size:150%; top:2%; right:2%; text-align:right;">Date: {{task.taskDate}}</span>
      <span class="text-ti" style="font-size:150%; top:17.5%; right:2%; text-align:right; max-width:40%">Status: {{task.taskStatus}}</span>
      <div class="text-ti"  style="font-size:100%; top:50%; left:2%; max-width:90%; max-height:45%">Description: {{task.taskDesc}}</div>
      <button class="button-icon text-button-filter button-wrapper"  @click="toggleModal" style="bottom: 10%; right: 2%; margin-left:1vh; position:absolute">...</button>
    </div>
 
    <!-- INFO MODAL -->
    <div class="modal" v-if="displayModal" @click.self="toggleModal" style="overflow-y: hidden"> <!-- @click.self for binding function only to this element, and not the children elements -->
      <div class="modal-container">
        <!-- DISPLAY INFO HERE -->
        <div v-if="isEditing">
          <!-- INPUT FIELDS Use v-model for text fields -->
          <div><p class="text-input-label" style="left: 39%">Edit Task</p></div>

          <span class="text-input-label" style="top:16%; left:2.5%">Task Name:</span>
          <input class="input-text" v-model="editTaskName" style="top:15%; left:33.5%"/>

          <span class="text-input-label" style="top:30%; left:2.5%">Task Date:</span>
          <input type="date" class="input-text" v-model="editTaskDate" style="top:29%; left:33.5%"/>

          <span class="text-input-label" style="top:44%; left:2.5%">Task Status:</span>
          <input class="input-text" v-model="editTaskStatus" style="top:43%; left:33.5%"/>

          <span class="text-input-label" style="top:58%; left:2.5%">Task Desc:</span>
          <textarea class="input-text" v-model="editTaskDesc" style="top:57%; left:33.5%; height: 12.5vh; width:52%; text-indent:0; padding:1vw;"></textarea>
            
          <button @click="componentSaveChanges" class="button-filter text-button-filter button-wrapper" style="right:16.67%; bottom:3.5%; margin-top:2.5%">Save Changes</button>
        </div>
        <div v-else>
          <p id="text1" class="text-modal" style="max-width:88.5%; max-height:15%; top:2%">{{ task.taskName }}</p>
          <div id="text2" class="text-modal" style="font-size:4vh; top:15%; max-width:80%">Date: {{ task.taskDate }}<br>Status: {{ task.taskStatus }}</div>
          <p id="text3" class="text-modal" style="top:35%; font-size:3vh;">Description:</p>
          <p id="text3" class="text-modal" style="top:45%; font-size:2vh; max-width:88.5%; max-height:40%;">{{ task.taskDesc }}</p>
            
          <button @click="componentDeleteComponent" class="button-filter text-button-filter button-wrapper" style="right:16.67%; bottom:3.5%; margin-top:2.5%">Delete Task</button>
        </div>
        <!-- MODAL MANAGE/DELETE EVENT -->
        <button @click="toggleEditing" class="button-filter text-button-filter button-wrapper" style="width:25%; left:16.67%; bottom:3.5%; margin-top:2.5%">Edit Task</button>
            
        <!-- MODAL EXIT -->
        <button class="button-expand text-button-filter button-wrapper" @click="toggleModal" style="padding-bottom: 0; top: 2.5%; right: 2%;">X</button>
      </div>
    </div>
    `,
  data() {
    return {
      displayModal: false,
      isEditing: false,

      editTaskName: "",
      editTaskDate: "",
      editTaskStatus: "",
      editTaskDesc: "",
    };
  },
  methods: {
    // MODAL FUNCTIONS
    toggleModal() {
      this.displayModal = !this.displayModal;
      this.isEditing = false;
      this.resetEdits();
    },
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    resetEdits() {
      this.editTaskName = this.task.taskName;
      this.editTaskDate = this.task.taskDate;
      this.editTaskDesc = this.task.taskDesc;
      this.editTaskStatus = this.task.taskStatus;
    },

    // EMIT FUNCTION
    selectProject() {
      this.$emit("select-project", this.task.project_id);
      console.log("ID OF COMPONENT SELECTED: ", this.task.project_id);
    },

    // DATABASE FUNCTIONS
    componentDeleteComponent() {
      axios
        .delete(this.deleteString)
        .then((response) => {
          console.log("Task DELETED SUCCESSFULLY: ", response.data);
        })
        .catch((error) => {
          console.error("ERROR DELETING Task: ", error);
        });

      // DELAY THEN LOAD TWICE
      this.toggleModal();
      const delayInMilliseconds = 300;
      setTimeout(() => {
        this.selectProject();
        setTimeout(() => {
          this.selectProject();
        }, delayInMilliseconds);
      }, delayInMilliseconds);
    },
    componentSaveChanges() {
      axios
        .post(this.editedString)
        .then((response) => {
          console.log("Task EDITED SUCCESSFULLY: ", response.data);
        })
        .catch((error) => {
          console.error("ERROR EDITING Task: ", error);
        });

      // DELAY THEN LOAD
      this.toggleModal();
      const delayInMilliseconds = 300;
      setTimeout(() => {
        this.selectProject();
        setTimeout(() => {
          this.selectProject();
        }, delayInMilliseconds);
      }, delayInMilliseconds);
    },
  },
  computed: {
    deleteString() {
      return "/deleteTI?tableName=Tasks&ti_id=" + this.task.task_id;
    },
    editedString() {
      return (
        "/editTI?ti_id=" +
        this.task.task_id +
        "&project_id=" +
        this.task.project_id +
        "&tableName=Tasks&editedName=" +
        this.editTaskName +
        "&editedDate=" +
        this.editTaskDate +
        "&editedStatus=" +
        this.editTaskStatus +
        "&editedDesc=" +
        this.editTaskDesc
      );
    },
  },
});
