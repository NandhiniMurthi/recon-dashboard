const database = require("../database/connection");

function getTargets(request, response) {
    const query = "SELECT * FROM targets";

    database.all(query, (error, rows) => {
        if (error) {
            return response.status(500).json({
                message: "Failed to fetch targets."
            });
        }

        response.json(rows);
    });
}
function createTarget(request, response) {
    const { domain, status } = request.body;

    const createdAt = new Date().toISOString();

    const query = `
        INSERT INTO targets (domain, status, createdAt)
        VALUES (?, ?, ?)
    `;

    database.run(query, [domain, status, createdAt], function (error) {
        if (error) {
            return response.status(500).json({
                message: "Failed to create target."
            });
        }

        response.status(201).json({
            message: "Target created successfully!",
            id: this.lastID
        });
    });
}
module.exports = {
    getTargets,
    createTarget
};
