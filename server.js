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
        success: true,
        message: "Server is running"
    });
});

app.post("/send-sms", async (req, res) => {

    try {

        const { phone, message } = req.body;

        if (!phone || !message) {
            return res.status(400).json({
                success: false,
                error: "Phone and message are required."
            });
        }

        const response = await axios.post(
            "https://api.telnyx.com/v2/messages",
            {
                from: process.env.TELNYX_FROM_NUMBER,
                to: phone,
                text: message
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.TELNYX_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return res.json({
            success: true,
            data: response.data
        });

    } catch (error) {

        console.log(error.response?.data || error.message);

        return res.status(500).json({
            success: false,
            error:
                error.response?.data?.errors?.[0]?.detail ||
                "Failed to send SMS."
        });

    }

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
