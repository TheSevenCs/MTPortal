const generalModule = require("../DataAccess/DatabaseDA.js");

// PROJECTS
module.exports.addProject = async function (
  newName,
  newClient,
  newDate,
  newDesc
) {
  const newProject = {
    projectName: newName,
    projectClient: newClient,
    projectDate: newDate,
    projectDesc: newDesc,
    project_id: (
      await generalModule.generateID(9000000000000, 9999999999999)
    ).toString(),
  };
  await generalModule.addToDatabase("Projects", newProject); // Need to await since it's an async function

  console.log("FROM tasks-issuesDA.js, NEW Project ADDED.");
};
module.exports.editProject = async function (
  editedName,
  editedClient,
  editedDate,
  editedDesc,
  project_id
) {
  const editedProject = {
    projectName: editedName,
    projectClient: editedClient,
    projectDate: editedDate,
    projectDesc: editedDesc,
  };
  const updateExpression =
    "SET " +
    Object.keys(editedProject)
      .map((key) => `${key} = :${key}`)
      .join(", ");

  // Constructing the expression attribute values object
  const expressionAttributeValues = {};
  Object.entries(editedProject).forEach(([key, value]) => {
    expressionAttributeValues[`:${key}`] = { S: value };
  });

  const primaryKey = {
    project_id: { S: project_id },
  };

  await generalModule.updateItemInDatabase(
    "Projects",
    primaryKey,
    updateExpression,
    expressionAttributeValues
  );
  console.log("FROM tasks-issuesDA.js, Project EDITED.");
};
module.exports.getProjects = async function () {
  const dbResults = await generalModule.getFromDatabase("Projects"); // Need to await since it's an async function
  return dbResults.Items;
};
module.exports.deleteProject = async function (eID) {
  try {
    const key = { project_id: eID };
    await generalModule.deleteFromDatabase("Projects", key); // Need to await since it's an async function
    console.log("FROM tasks-issuesDA.js, Project DELETED.");
  } catch (error) {
    console.log("FROM tasks-issuesDA.js, ERROR DELETING Project. ", error);
  }
};

// TASKS AND ISSUES
module.exports.addTI = async function (
  proj_ID,
  tableName,
  newName,
  newDate,
  newStatus,
  newDesc
) {
  try {
    if (tableName === "Tasks") {
      const newTI = {
        project_id: proj_ID,
        task_id: (
          await generalModule.generateID(9000000000000, 9999999999999)
        ).toString(),
        taskName: newName,
        taskDate: newDate,
        taskStatus: newStatus,
        taskDesc: newDesc,
      };
      await generalModule.addToDatabase(tableName, newTI);
      console.log("FROM tasks-issuesDA.js, NEW Task ADDED.");
    } else if (tableName === "Issues") {
      const newTI = {
        project_id: proj_ID,
        issue_id: (
          await generalModule.generateID(9000000000000, 9999999999999)
        ).toString(),
        issueName: newName,
        issueDate: newDate,
        issueStatus: newStatus,
        issueDesc: newDesc,
      };
      await generalModule.addToDatabase(tableName, newTI);
      console.log("FROM tasks-issuesDA.js, NEW Issue ADDED.");
    } else {
      console.error("FROM tasks-issuesDA.js, ERROR IN IF ELSE BLOCK: ", error);
    }
  } catch (error) {
    console.error("FROM tasks-issuesDA.js, ERROR ADDING Task/Issue: ", error);
  }
};
module.exports.editTI = async function (
  ti_id,
  proj_id,
  tableName,
  editedName,
  editedDate,
  editedStatus,
  editedDesc
) {
  try {
    if (tableName === "Tasks") {
      const taskDetails = {
        taskName: editedName,
        taskDate: editedDate,
        taskStatus: editedStatus,
        taskDesc: editedDesc,
      };

      // Constructing the update expression dynamically
      const updateExpression =
        "SET " +
        Object.keys(taskDetails)
          .map((key) => `${key} = :${key}`)
          .join(", ");

      // Constructing the expression attribute values object
      const expressionAttributeValues = {};
      Object.entries(taskDetails).forEach(([key, value]) => {
        expressionAttributeValues[`:${key}`] = { S: value };
      });

      const primaryKey = {
        task_id: { S: ti_id },
        project_id: { S: proj_id },
      };

      await generalModule.updateItemInDatabase(
        tableName,
        primaryKey,
        updateExpression,
        expressionAttributeValues
      );
      console.log("FROM tasks-issuesDA.js, Task EDITED.");
    } else if (tableName === "Issues") {
      const primaryKey = {
        issue_id: { S: ti_id },
        project_id: { S: proj_id },
      };

      const issueDetails = {
        issueName: editedName,
        issueDate: editedDate,
        issueStatus: editedStatus,
        issueDesc: editedDesc,
      };

      // Constructing the update expression dynamically
      const updateExpression =
        "SET " +
        Object.keys(issueDetails)
          .map((key) => `${key} = :${key}`)
          .join(", ");

      // Constructing the expression attribute values object
      const expressionAttributeValues = {};
      Object.entries(issueDetails).forEach(([key, value]) => {
        expressionAttributeValues[`:${key}`] = { S: value };
      });

      await generalModule.updateItemInDatabase(
        tableName,
        primaryKey,
        updateExpression,
        expressionAttributeValues
      );
      console.log("FROM tasks-issuesDA.js, Issue EDITED.");
    } else {
      console.error("FROM tasks-issuesDA.js, ERROR IN IF ELSE BLOCK: ", error);
    }
  } catch (error) {
    console.log("FROM tasks-issuesDA.js, ERROR EDITING Task/Issue: ", error);
  }
};

module.exports.getTIByID = async function (tableName, attribute, project_id) {
  if (tableName === "Tasks") {
    const dbResults = await generalModule.getFromDatabase(
      "Tasks",
      attribute,
      project_id
    );
    return dbResults.Items;
  } else if (tableName === "Issues") {
    const dbResults = await generalModule.getFromDatabase(
      "Issues",
      attribute,
      project_id
    );
    return dbResults.Items;
  } else {
    console.error(
      "FROM tasks-issuesDA.js/getTIByID(), ERROR IN IF ELSE BLOCK: ",
      error
    );
  }
};
module.exports.deleteTI = async function (tableName, ti_id, sortKey) {
  try {
    if (tableName === "Tasks") {
      const key = {
        task_id: ti_id,
        project_id: sortKey,
      };
      await generalModule.deleteFromDatabase(tableName, key);
      console.log("FROM tasks-issuesDA.js, Task DELETED.");
    } else if (tableName === "Issues") {
      const key = {
        issue_id: ti_id,
        project_id: sortKey,
      };
      await generalModule.deleteFromDatabase(tableName, key);
      console.log("FROM tasks-issuesDA.js, Issue DELETED.");
    } else {
      console.error("FROM tasks-issuesDA.js, ERROR IN IF ELSE BLOCK: ", error);
    }
  } catch (error) {
    console.error("FROM tasks-issuesDA.js, ERROR DELETING Task/Issue: ", error);
  }
};
