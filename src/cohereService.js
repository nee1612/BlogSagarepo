// src/cohereService.js
import axios from "axios";

const API_KEY = "4VWRJWzxopTpPsketS2mfDQ0xUweo3MhGGZoQRqv"; // Replace with your API key

const cohereAPI = axios.create({
  baseURL: "https://api.cohere.ai/v1",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const generateContent = async (prompt) => {
  try {
    const response = await cohereAPI.post("/generate", {
      model: "command-xlarge-nightly", // or any model you prefer
      prompt: prompt,
      max_tokens: 500, // Adjust as needed
    });
    return response.data; // Ensure this matches the structure you're working with
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};
