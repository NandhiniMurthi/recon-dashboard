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

module.exports = {
    getTargets
};