import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    console.log('Received message:', message);

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o', // Specify the model here
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message }
        ],
        max_tokens: 150,
      }, {
        headers: {
          'Authorization': `Bearer sk-8X8LkAPrzMxlx8BO49HhF7h6IpUcIeQRndoMNSDrxRT3BlbkFJbgg1hTTAQ48rJl33fBhXivgCTuACtQLAQo8Rka_DoA`,
          'Content-Type': 'application/json',
        },
      });

      console.log('OpenAI response:', response.data);
      res.status(200).json({ response: response.data.choices[0].message.content });
    } catch (error) {
      console.error('Error communicating with GPT-4:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Error communicating with GPT-4' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
