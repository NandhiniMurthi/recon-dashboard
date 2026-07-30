require("dotenv").config();
const express = require("express");
const targetRoutes = require("./routes/targets");
const database = require("./config/database");require("./database/schema");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.send("Recon Dashboard Backend is running!");
});

app.use("/api/targets", targetRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});