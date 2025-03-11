const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-to-botghost", async (req, res) => {
    try {
        // The payload is taken from the incoming request body
        const payload = req.body;

        const botGhostWebhook = "https://api.botghost.com/webhook/1279602479054454814/o8pp3d4kfghsnuiz50ik9";
        const response = await fetch(botGhostWebhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.BOTGHOST_AUTH // Ensure this environment variable is set properly
            },
            body: JSON.stringify(payload)
        });

        // If response is not okay, handle it
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error sending to BotGhost:", errorData);
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();
        res.status(response.status).json(data);  // Respond with the BotGhost API response
    } catch (error) {
        console.error("Error forwarding request:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// Use the environment variable PORT to bind to the correct port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Proxy server running on port ${PORT}`);
});
