const express = require("express");
const database = require("./database/connection");
require("./database/schema");
const app = express();
app.use(express.json());
const targetRoutes = require("./routes/targets");
const PORT = 3000;

app.get("/", (request, response) => {
    response.send("Recon Dashboard Backend is running!");
});

app.use("/api/targets", targetRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});