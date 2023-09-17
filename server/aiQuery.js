const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001; // You can use any port

app.use(express.json()); // for parsing application/json

app.post('/gpt-response', async (req, res) => {
  try {
    const userAssistant = req.body.userAssistant;

    if (!Array.isArray(userAssistant)) {
      throw new Error('`userAssistant` should be a list of prompts (ex: ["Explain what a neural network is."])');
    }

    const system = "You are an educational expert who excels at creating lesson plans.";
    const systemMessage = [{ role: 'system', content: system }];

    const userAssistantMessages = userAssistant.map((prompt, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: prompt,
    }));

    const messages = [...systemMessage, ...userAssistantMessages];

    const response = await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', {
      messages,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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', // Replace with your OpenAI API key
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
