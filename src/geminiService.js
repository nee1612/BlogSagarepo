import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyB23PrYRg0E6fhaq4w1W3z0gxJeAFGKgts";
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateGeminiContent = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = response.text();
    return { text: output };
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw error;
  }
};
