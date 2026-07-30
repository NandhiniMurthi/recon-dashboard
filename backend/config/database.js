const sqlite3 = require("sqlite3").verbose();

const database = new sqlite3.Database("./database/recon-dashboard.db", (error) => {
    if (error) {
        console.error("Database connection failed:", error.message);
        return;
    }

    console.log("Connected to SQLite database.");
});

module.exports = database;