const { getTargets } = require("../controllers/targetsController");
const express = require("express");
const database = require("../database/connection");
const router = express.Router();

router.get("/", getTargets);

module.exports = router;

router.post("/", (request, response) => {
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
});
router.put("/:id", (request, response) => {
    const { id } = request.params;
    const { domain, status } = request.body;

    const query = `
        UPDATE targets
        SET domain = ?, status = ?
        WHERE id = ?
    `;

    database.run(query, [domain, status, id], function (error) {
        if (error) {
            return response.status(500).json({
                message: "Failed to update target."
            });
        }

        if (this.changes === 0) {
            return response.status(404).json({
                message: "Target not found."
            });
        }

        response.json({
            message: "Target updated successfully!"
        });
    });
});
router.delete("/:id", (request, response) => {
    const { id } = request.params;

    const query = `
        DELETE FROM targets
        WHERE id = ?
    `;

    database.run(query, [id], function (error) {
        if (error) {
            return response.status(500).json({
                message: "Failed to delete target."
            });
        }

        if (this.changes === 0) {
            return response.status(404).json({
                message: "Target not found."
            });
        }

        response.json({
            message: "Target deleted successfully!"
        });
    });
});