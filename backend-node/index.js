import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'CrunchGuardian Node.js server is running!' });
});

app.post('/analyze', async (req, res) => {
    const { address } = req.body;

    if (!address) {
        return res.status(400).json({ error: 'Address is required.' });
    }

    console.log(`[Node]  => Forwarding analysis for ${address} to Python service.`);

    try {
        const responseFromAI = await axios.post(
            `${process.env.AI_SERVICE_URL}/generate-report`, 
            { address: address }
        );
        res.status(200).json(responseFromAI.data);
    } catch (error) {
        console.error("[Node] Error calling AI service:", error.message);
        const status = error.response?.status || 500;
        const detail = error.response?.data?.detail || 'Failed to communicate with the AI service.';
        res.status(status).json({ detail: detail });
    }
});

app.listen(PORT, () => {
    console.log(`Node.js server listening on http://localhost:${PORT}`);
});