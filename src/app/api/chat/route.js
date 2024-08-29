import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { messages, fileId } = await req.json();

  const response = await openai.chat.completions.create({
    model: "ft:gpt-3.5-turbo-0125:personal::A19vP0ZP",
    messages: [
      ...messages,
      { role: "system", content: "You are a helpful assistant trained to answer questions in Chinese." },
      { role: "user", content: "Your prompt here" }
    ],
    temperature: 0.7,
    stream: true,
    file_ids: fileId ? [fileId] : undefined,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
