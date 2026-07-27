const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
    const targets = [
        {
            id: 1,
            domain: "example.com",
            status: "Active"
        }
    ];

    response.json(targets);
});

module.exports = router;