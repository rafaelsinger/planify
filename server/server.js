const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001; 

app.use(express.json()); // for parsing application/json
app.use(cors());

app.post('/gpt-response', async (req, res) => {
  try {
    const { prompt } = req.body; // Destructuring single string prompt

    if (typeof prompt !== 'string') {
      throw new Error('`prompt` should be a string (ex: "Explain what a neural network is.")');
    }

    const system = "You are an educational expert who excels at creating lesson plans.";
    const messages = [
      { role: 'system', content: system },
      { role: 'user', content: prompt } // Directly using the prompt here
    ];

    const response = await axios.post('https://api.openai.com/v1/chat/completions', 
    {
      "model": "gpt-3.5-turbo",
      "messages" : messages,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const status = response.data.choices[0].finish_reason;

    if (status !== 'stop') {
      throw new Error(`The status code was ${status}`);
    }

    res.json({ messageContent: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// Example usage:
// const systemPrompt = 'You are a machine learning expert.';
// const userAssistantPrompts = ['Explain what a neural network is.'];

// gptResponse(systemPrompt, userAssistantPrompts)
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.error(error);
//   });
