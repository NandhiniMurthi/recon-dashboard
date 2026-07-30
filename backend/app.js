const cors = require("cors");
require("dotenv").config();
const express = require("express");
const logger = require("./middleware/logger");
const targetRoutes = require("./routes/targets");
const database = require("./config/database");
require("./db/schema");
const errorHandler = require("./middleware/errorHandler");
const app = express();
app.use(cors());
app.use(logger);
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.send("Recon Dashboard Backend is running!");
});

app.use("/api/targets", targetRoutes);
app.use((request, response) => {
    response.status(404).json({
        message: "Route not found."
    });
});
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});