import React, { useState, useContext } from "react";
import { generateContent } from "./cohereService";
import { generateGeminiContent } from "./geminiService"; // Import Gemini service
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./BlogGenerator.css";
import PrIcon from "../src/assets/blog.png";
import BlogContext from "./contexts/BlogContext";

const BlogGenerator = () => {
  const { userData } = useContext(BlogContext);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCohere, setIsCohere] = useState(true); // State to toggle between AI models

  const handleGenerateContent = async () => {
    if (!prompt.trim()) return;

    const userMessage = { text: prompt, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setPrompt(""); // Clear the input

    setLoading(true);
    try {
      const result = isCohere
        ? await generateContent(userMessage.text)
        : await generateGeminiContent(userMessage.text);
      console.log(result);
      const content = isCohere
        ? result.generations[0]?.text || "No content generated"
        : result.text || "No content generated";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: content, sender: "ai" },
      ]);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={materialDark}
          className="code-block"
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const handleToggleChange = () => {
    setIsCohere(!isCohere);
  };

  return (
    <div className="flex bg-red-500 mt-[3.5rem] h-[calc(100vh-3.5rem)]">
      <section className="w-[25%] p-4 bg-gray-800 text-white">
        <h2 className="text-xl font-bold">Left Section</h2>
        <p>Additional content can go here.</p>
        <div className="toggle-container mt-4 flex items-center">
          <label className="switch">
            <input
              type="checkbox"
              checked={isCohere}
              onChange={handleToggleChange}
            />
            <span className="slider round"></span>
          </label>
          <span className="ml-2 text-sm">
            {isCohere ? "Cohere AI" : "Gemini"}
          </span>
        </div>
      </section>

      <section className="w-full p-4 flex flex-col bg-gray-100">
        <div className="message-container flex-grow bg-white p-4 rounded shadow-sm">
          {messages.map((message, index) => (
            <>
              {message.sender === "user" ? (
                <div key={index} className={`mb-4 p-2 rounded-md user-message`}>
                  <p>
                    <ReactMarkdown components={components}>
                      {message.text}
                    </ReactMarkdown>
                  </p>
                  <img
                    src={userData.photoURL}
                    className="w-10 h-10 mt-1 rounded-full"
                    alt=""
                  />
                </div>
              ) : (
                <div key={index} className={`mb-4 p-2 rounded-md ai-message`}>
                  <img src={PrIcon} className="w-6 h-6 mt-4" alt="" />
                  <p>
                    <ReactMarkdown components={components}>
                      {message.text}
                    </ReactMarkdown>
                  </p>
                </div>
              )}
            </>
          ))}
        </div>

        <div className="chat-input-container mt-4 flex items-center">
          <input
            type="text"
            className="chat-input flex-grow p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your blog prompt here"
          />
          <button
            onClick={handleGenerateContent}
            className="send-button ml-3 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? (
              <span className="loader"></span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlogGenerator;
