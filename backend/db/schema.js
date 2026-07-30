const database = require("../config/database");
const createTargetsTable = `
    CREATE TABLE IF NOT EXISTS targets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        domain TEXT NOT NULL,
        status TEXT NOT NULL,
        createdAt TEXT NOT NULL
    );
`;

database.run(createTargetsTable, (error) => {
    if (error) {
        console.error("Failed to create targets table:", error.message);
        return;
    }

    console.log("Targets table is ready.");
});