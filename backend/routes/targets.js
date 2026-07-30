const { getTargets, createTarget, updateTarget } = require("../controllers/targetsController");
const express = require("express");
const database = require("../database/connection");
const router = express.Router();

router.get("/", getTargets);

module.exports = router;

router.post("/", createTarget);
router.put("/:id", updateTarget);
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