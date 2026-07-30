const { getTargets, createTarget, updateTarget, deleteTarget } = require("../controllers/targetsController");
const express = require("express");
const database = require("../database/connection");
const router = express.Router();

router.get("/", getTargets);

module.exports = router;

router.post("/", createTarget);
router.put("/:id", updateTarget);
router.delete("/:id", deleteTarget);
