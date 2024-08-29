"use client";
import { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { formatDataForOpenAI } from "@/utils/dataFormatter";
import { fetchSheetData } from "@/lib/fetchSheetData";

export default function TestAssistant() {
  // 版本號用 console.log 顯示
  const version = "0.1.0";
  useEffect(() => {
    console.log(`版本號: ${version}`);
  }, []);

  const [fileId, setFileId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUploadData, setIsUploadData] = useState(false);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    body: { fileId },
  });

  const handleUploadData = () => {
    console.log("Uploading data...");
    // setIsUploadData(true);
    // 待確定 prompt 和 completion 的資料
  };

  useEffect(() => {
    if (!isUploadData) return;
    async function prepareData() {
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
  }, [isUploadData]);
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {isLoading && (
        <div className="flex justify-center items-center h-screen text-gray_5 text-2xl font-bold">
          Loading...
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-screen text-gray_5 text-2xl font-bold">
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      )}
      <div className="pt-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">Assistant Test</h1>
          <button
            type="button"
            onClick={handleUploadData}
            className="bg-gray_5 hover:bg-gray_4 text-white font-bold py-2 px-4 rounded"
          >
            Upload Data
          </button>
        </div>
        
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
            className="bg-gray_5 hover:bg-gray_4 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
