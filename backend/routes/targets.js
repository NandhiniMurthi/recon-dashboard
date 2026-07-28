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

router.post("/", (request, response) => {
    const newTarget = request.body;

    console.log("Received target:", newTarget);

    response.status(201).json({
        message: "Target received successfully!",
        target: newTarget
    });
});