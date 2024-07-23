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
      tasksSelected: true,
      issuesSelected: false,

      sidebarVisible: true,
      showSidebarElements: true,

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
      this.tasksSelected = true;
      this.issuesSelected = false;
    },
    selectIssues() {
      this.tasksSelected = false;
      this.issuesSelected = true;
    },

    // SIDEBAR FUNCTIONS
    toggleSidebar() {
      if (this.sidebarVisible === true) {
        this.sidebarVisible = !this.sidebarVisible;
        this.toggleSidebarElements();
        this.resizeProjects();
      } else {
        this.sidebarVisible = !this.sidebarVisible;
        this.resizeProjects();
        this.toggleSidebarElements();
      }
    },
    resizeProjects() {
      const sidebar = document.getElementById("projectSidebar");

      // EXPANDING THE SIDEBAR
      if (this.sidebarCollapsed === true) {
        this.sidebarCollapsed = !this.sidebarCollapsed;
        sidebar.style.flex = 0.5;
      }
      // COLLAPSING THE SIDEBAR
      else {
        this.sidebarCollapsed = !this.sidebarCollapsed;
        sidebar.style.flex = 1;
      }
    },
    toggleSidebarElements() {
      this.showSidebarElements = !this.showSidebarElements;
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
      axios
        .post(
          "/project",
          {},
          {
            params: {
              newName: this.newProjectName,
              newClient: this.newProjectClient,
              newDate: this.newProjectDate,
              newDesc: this.newProjectDesc,
            },
          }
        )
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
        const response = await axios.get("/project");
        this.projects = response.data;
        console.log("FROM loadProjectsToHTML: ", response.data);
      } catch (error) {
        console.error("ERROR DURING RETRIEVAL: ", error);
      }
    },
    async getTIByID(tableName, proj_id) {
      try {
        const response = await axios.get("/task-issue", {
          params: {
            tableName: tableName,
            project_id: proj_id,
          },
        });
        tableName == "Tasks"
          ? (this.tasks = response.data)
          : (this.issues = response.data);

        console.log("TASKS FROM getTI: ", response.data);
      } catch (error) {
        console.error("ERROR DURING RETREIVAL: ", error);
      }
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
