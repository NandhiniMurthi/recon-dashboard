const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (request, response) => {
    response.send("Recon Dashboard Backend is running!");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});