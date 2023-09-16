import OpenAI from "openai";

import os from "openai";

const openai = new OpenAI({
    apiKey: process.env.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,
});

const axios = require('axios');

async function gptResponse(userAssistant) {
//   if (typeof system !== 'string') {
//     throw new Error('`system` should be a string (ex.: “You are a machine learning expert.” or “You are a data science expert.)');
//   }

  if (!Array.isArray(userAssistant)) {
    throw new Error('`userAssistant` should be a list of prompts (ex: ["Explain what a neural network is."])');
  }

  //if needed, can change system message depending on user input
  const system = "You are an educational expert who excels at creating lesson plans.";
  const systemMessage = [{ role: 'system', content: system }];

  const userAssistantMessages = userAssistant.map((prompt, i) => ({
    role: i % 2 === 0 ? 'user' : 'assistant',
    content: prompt,
  }));

  const messages = [...systemMessage, ...userAssistantMessages];

  try {
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

    return response.data.choices[0].message.content;
  } catch (error) {
    throw error;
  }
}

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

