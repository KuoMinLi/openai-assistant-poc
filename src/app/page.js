"use client";
import { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { formatDataForOpenAI } from "@/utils/dataFormatter";
import { fetchSheetData } from "./fetchSheetData";

export default function TestAssistant() {
  const [fileId, setFileId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestMade = useRef(false);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    body: { fileId },
  });

  useEffect(() => {
    if (requestMade.current) return;
    async function prepareData() {
      if (requestMade.current) return;
      requestMade.current = true;
      try {
        setIsLoading(true);
        const sheetData = await fetchSheetData();
        const formattedData = formatDataForOpenAI(sheetData);

        const response = await fetch("/api/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedData),
        });

        if (!response.ok) {
          throw new Error("Failed to upload data to OpenAI");
        }

        const { fileId } = await response.json();
        setFileId(fileId);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    prepareData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Assistant Test</h1>
      <div className="mb-4">
        {messages.map((m) => (
          <div key={m.id} className="mb-2">
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          className="flex-grow border rounded p-2 mr-2 text-black"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
}
