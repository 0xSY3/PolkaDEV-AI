// src/services/brianService.ts
import axios from 'axios';

const BRIAN_API_URL = 'https://api.brianknows.org/api/v0/agent/knowledge';

export const askBrian = async (prompt: string, kb: string = 'public-knowledge-box') => {
 try {
    const response = await axios.post(BRIAN_API_URL, { prompt, kb }, {
      headers: {
        'x-brian-api-key': process.env.BRIAN_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
 } catch (error) {
    console.error('Error asking Brian:', error);
    throw error;
 }
};
