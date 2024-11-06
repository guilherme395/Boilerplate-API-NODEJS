const express = require("express");
const dotenv = require("dotenv");
const app = express();
const router = require("./router.js");

dotenv.config();
app.use(express.json());

app.use("/api", router);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Router not found."
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`)
});