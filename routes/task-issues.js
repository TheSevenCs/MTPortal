const express = require("express");
const tasksModule = require("../DataAccess/tasks-issuesDA.js");
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    project_id,
    newTIType,
    newTIName,
    newTIDate,
    newTIStatus,
    newTIDesc,
  } = req.query;
  try {
    await tasksModule.addTI(
      project_id,
      newTIType,
      newTIName,
      newTIDate,
      newTIStatus,
      newTIDesc
    );
    console.log("FROM route.js, NEW Task/Issue ADDED.");
  } catch (error) {
    console.error("FROM route.js, ERROR CREATING NEW Task/Issue: ", error);
  }
});
router.patch("/", async (req, res) => {
  const {
    ti_id,
    project_id,
    tableName,
    editedName,
    editedDate,
    editedStatus,
    editedDesc,
  } = req.query;
  try {
    await tasksModule.editTI(
      ti_id,
      project_id,
      tableName,
      editedName,
      editedDate,
      editedStatus,
      editedDesc
    );
    console.log("FROM route.js, Task/Issue EDITED.");
  } catch (error) {
    console.error("FROM route.js, ERROR EDITING Task/Issue: ", error);
  }
});
router.get("/", async (req, res) => {
  const { tableName, project_id } = req.query;
  try {
    if (tableName === "Tasks") {
      const tasks = await tasksModule.getTIByID(
        "Tasks",
        "project_id",
        project_id
      );
      const formattedTasks = tasks.map((task) => {
        return {
          taskName: task.taskName,
          taskDate: task.taskDate,
          taskDesc: task.taskDesc,
          taskStatus: task.taskStatus,
          task_id: task.task_id,
          project_id: task.project_id,
        };
      });

      res.json(formattedTasks);
    } else if (tableName === "Issues") {
      const issues = await tasksModule.getTIByID(
        "Issues",
        "project_id",
        project_id
      );
      const formattedIssues = issues.map((issue) => {
        return {
          issueName: issue.issueName,
          issueDate: issue.issueDate,
          issueDesc: issue.issueDesc,
          issueStatus: issue.issueStatus,
          issue_id: issue.issue_id,
          project_id: issue.project_id,
        };
      });

      res.json(formattedIssues);
    } else {
      console.error(
        "FROM route.js/getTIByID(), ERROR IN IF ELSE BLOCK: ",
        error
      );
    }
  } catch (error) {
    console.error("FROM route.js, ERROR WITH getTasksByID: ", error);
  }
});
router.delete("/", async (req, res) => {
  const { tableName, ti_id, project_id } = req.query;
  try {
    tasksModule.deleteTI(tableName, ti_id, project_id);
    console.log("FROM route.js, Task/Issue DELETED.");
  } catch (error) {
    console.error("FROM route.js, ERROR DELETING Task/Issue: ", error);
  }
});
module.exports = router;
