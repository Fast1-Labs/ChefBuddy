import axios from 'axios';

const apiKey = process.env.OPENAI_API_KEY;

export const fetchMealSuggestions = async (ingredients: string[]) => {
  const prompt = `Generate meal ideas based on these ingredients ${ingredients.join(', ')}`;
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.choices[0].text.trim();
};
