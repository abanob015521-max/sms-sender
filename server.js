require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
    res.json({
        status: "online",
        app: "SMS Sender"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
