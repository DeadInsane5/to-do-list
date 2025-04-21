const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Ollama is running' });
});

app.post('/process-speech', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'No text provided' });
    }

    try {
        const prompt = `Return a todo list of tasks extracted from ${text}, return a JSON array of tasks as a raw JSON string, without Markdown or code blocks.`;
        const response = await axios.post('http://192.168.0.107:8080/api/generate', {
            model: 'gemma3:1b',
            prompt,
            stream: false
        });

        // Log raw response for debugging
        console.log('Ollama raw response:', response.data);

        // Extract the response string
        let responseText = response.data.response;

        // Remove Markdown code block markers (```json and ```)
        responseText = responseText.replace(/```json\n|```/g, '').trim();

        // Parse the JSON
        let tasks;
        try {
            tasks = JSON.parse(responseText);
        } catch (parseError) {
            console.error('Failed to parse Ollama response:', responseText);
            tasks = [text]; // Fallback
        }

        res.json({
            text,
            tasks
        });
    } catch (error) {
        console.error('Ollama error:', error.message);
        res.status(500).json({ error: 'Failed to process text with Ollama' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});