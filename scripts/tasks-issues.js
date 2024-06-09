const tasksissuesApp = Vue.createApp({
  data() {
    return {
      projects: [],
      tasks: [],
      issues: [],

      newProjectName: "",
      newProjectClient: "",
      newProjectDate: "",
      newProjectDesc: "",

      displayAddModal: false,
      selectedTab: "Tasks",
      selectedProjectID: "",
    };
  },
  methods: {
    // MODAL FUNCTIONS
    toggleAddModal() {
      this.displayAddModal = !this.displayAddModal;
    },

    // NAV BAR FUNCTIONS
    selectTasks() {
      this.selectedTab = "Tasks";
    },
    selectIssues() {
      this.selectedTab = "Issues";
    },

    // CALLED BY COMPONENT CLICK $emit
    // Function: Load tasks/issues into app array
    // also refreshes the list of tasks/issues
    getProjectID(project_id) {
      this.selectedProjectID = project_id;
      console.log("selectedProjectID: ", this.selectedProjectID);

      try {
        this.getTIByID("Tasks", this.selectedProjectID);
        this.getTIByID("Issues", this.selectedProjectID);
      } catch (error) {
        console.error(
          "FROM tasks-issues.js/getProjectID(), ERROR IN TRY CATCH: ",
          error
        );
      }
    },

    // DATABASE FUNCTIONS
    addNewProject() {
      console.log(this.addString);
      axios
        .post(this.addString)
        .then((response) => {
          console.log("Project ADDED SUCCESSFULLY: ", response.data);
        })
        .catch((error) => {
          console.error("ERROR ADDING Project: ", error);
        });

      // RESET VARIABLES
      {
        this.newProjectName = "";
        this.newProjectClient = "";
        this.newProjectDate = "";
        this.newProjectDesc = "";
      }

      // DELAY THEN LOAD
      this.displayAddModal = false;
      const delayInMilliseconds = 300;
      setTimeout(() => {
        this.loadProjectsToHTML();
        setTimeout(() => {
          this.loadProjectsToHTML();
        }, delayInMilliseconds);
      }, delayInMilliseconds);
    },
    async loadProjectsToHTML() {
      try {
        const response = await axios.get("/getProjects");
        this.projects = response.data;
        console.log("FROM loadProjectsToHTML: ", response.data);
      } catch (error) {
        console.error("ERROR DURING RETRIEVAL: ", error);
      }
    },
    async getTIByID(tableName, proj_id) {
      try {
        if (tableName === "Tasks") {
          const response = await axios.get(
            "/getTIByID?tableName=Tasks&project_id=" + proj_id
          );
          this.tasks = response.data;
          console.log("TASKS FROM getTI: ", response.data);
        } else if (tableName === "Issues") {
          const response = await axios.get(
            "getTIByID?tableName=Issues&project_id=" + proj_id
          );
          this.issues = response.data;
          console.log("ISSUES FROM getTI: ", response.data);
        } else {
          console.error(
            "FROM tasks-issues.js/getTIByID(), ERROR IN IF ELSE BLOCK: ",
            error
          );
        }
      } catch (error) {
        console.error("ERROR DURING RETREIVAL: ", error);
      }
    },
  },
  computed: {
    addString() {
      return (
        "/addProject?newName=" +
        this.newProjectName +
        "&newClient=" +
        this.newProjectClient +
        "&newDate=" +
        this.newProjectDate +
        "&newDesc=" +
        this.newProjectDesc
      );
    },
  },
  mounted() {
    this.loadProjectsToHTML();

    const delayInMilliseconds = 300;
    setTimeout(() => {
      this.loadProjectsToHTML();
    }, delayInMilliseconds);
  },
});
