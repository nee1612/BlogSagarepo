import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { set } from "firebase/database";

const GeminiTest = () => {
  const API_KEY = "AIzaSyB23PrYRg0E6fhaq4w1W3z0gxJeAFGKgts"; // Replace with your actual API key
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testGemini = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setResult(text);
    } catch (error) {
      console.error("Error generating content with Gemini:", error);
      setResult(
        "Failed to generate content. Check the console for more details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gemini AI Test</h1>
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={testGemini}
        disabled={loading}
      >
        {loading ? "Generating..." : "Test Gemini"}
      </button>
      {result && (
        <div className="mt-4 p-2 bg-gray-100 border rounded">
          <h2 className="text-xl font-bold mb-2">Generated Content:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiTest;
