import mysql from "mysql2/promise";
import fs from "fs";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "MTDB",
});

async function createDatabaseAndTables() {
  try {
    // Read the SQL script from file
    const sqlScript = fs.readFileSync("database/MTDB.sql", "utf8");

    // Split SQL script into individual statements
    const sqlStatements = sqlScript
      .split(";")
      .filter((statement) => statement.trim() !== "");

    // Execute each SQL statement one by one
    for (const statement of sqlStatements) {
      await pool.query(statement);
      console.log(`Executed SQL statement: ${statement}`);
    }

    console.log("Database and tables created successfully.");
  } catch (error) {
    console.error("Error creating database and tables:", error);
  }
}

// Call the function to create the database and tables
createDatabaseAndTables();

// Execute a query outside the function
async function CheckPassword(username) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT EmpPassword FROM Employee WHERE EmpUsername = ?",
      [username]
    );
    const password = rows.length > 0 ? rows[0].EmpPassword : null;
    return password;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

// Usage
CheckPassword("a")
  .then((password) => {
    console.log("The password is:", password);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
