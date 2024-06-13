const express = require("express");
const tasksModule = require("../DataAccess/tasks-issuesDA.js");
const router = express.Router();

// TASKS/ISSUES PAGE
router.post("/", async (req, res) => {
  const { newName, newClient, newDate, newDesc } = req.query;
  try {
    await tasksModule.addProject(newName, newClient, newDate, newDesc);
    console.log("FROM route.js, NEW Project ADDED.");
  } catch (error) {
    console.error("FROM route.js, ERROR CREATING NEW Project: ", error);
  }
});
router.patch("/", async (req, res) => {
  const { editedName, editedClient, editedDate, editedDesc, project_id } =
    req.query;
  try {
    await tasksModule.editProject(
      editedName,
      editedClient,
      editedDate,
      editedDesc,
      project_id
    );
    console.log("FROM route.js, Project EDITED.");
  } catch (error) {
    console.error("FROM route.js, ERROR EDITING Project: ", error);
  }
});
router.get("/", async (req, res) => {
  try {
    const projects = await tasksModule.getProjects();
    const formattedProjects = projects.map((project) => {
      return {
        projectName: project.projectName,
        projectClient: project.projectClient,
        projectDate: project.projectDate,
        projectDesc: project.projectDesc || "",
        // eventsDA gives 'event_id' which is processed here and given to axios call
        project_id: project.project_id,
      };
    });

    res.json(formattedProjects);
  } catch (error) {
    console.error("Error occurred while getting projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/", async (req, res) => {
  const { project_id } = req.query;
  try {
    await tasksModule.deleteProject(project_id);
    console.log(`Project: ${project_id} DELETED.`);
  } catch (error) {
    console.error("FROM route.js, Project COULD NOT BE DELETED: ", error);
  }
});

module.exports = router;
