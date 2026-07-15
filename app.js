require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        service: process.env.APP_NAME,
        status: "Running"
    });

});

app.post("/api/notification", (req, res) => {

    const {

        type,
        recipient,
        message

    } = req.body;

    if (!type || !recipient || !message) {

        return res.status(400).json({

            success: false,

            message: "Missing required fields"

        });

    }

    res.json({

        success: true,

        notificationId: "NOTIFY" + Date.now(),

        type,

        recipient,

        message,

        status: "SENT",

        branch: "dev"

    });

});

const PORT = process.env.PORT;

app.listen(PORT, () => {

    console.log(`${process.env.APP_NAME} running on port ${PORT}`);

});