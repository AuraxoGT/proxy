const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-to-botghost", async (req, res) => {
    try {
        const botGhostWebhook = "https://api.botghost.com/webhook/1279602479054454814/o8pp3d4kfghsnuiz50ik9";
        const response = await fetch(botGhostWebhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.BOTGHOST_AUTH
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error("Error forwarding request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Proxy server running on port ${PORT}`));
