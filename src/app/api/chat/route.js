import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req) {
  
  const { messages, fileId } = await req.json();

  const response = await openai.chat.completions.create({
    model: "job.fine_tuned_model",
    messages: [
      ...messages,
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Your prompt here" }
    ],
    response_format: { type: "json_object" },
    stream: true,
    file_ids: fileId ? [fileId] : undefined,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
