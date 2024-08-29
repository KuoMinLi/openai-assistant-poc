import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { promises as fsPromises } from "fs";
import fs from "fs";
import os from "os";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  let tempFilePath;
  try {
    // 從請求體中獲取格式化後的數據
    const formattedData = await request.json();

    // 驗證數據
    if (!Array.isArray(formattedData) || formattedData.length === 0) {
      throw new Error("Invalid data format. Expected non-empty array.");
    }

    // 轉換數據為 JSONL 格式
    const jsonlData = formattedData
      .map((item) => {
        return JSON.stringify(item);
      })
      .join("\n");
    console.log("jsonlData", jsonlData);

    // 創建一個臨時文件
    tempFilePath = path.join(
      os.tmpdir(),
      `temp_training_data_${Date.now()}.jsonl`
    );
    await fsPromises.writeFile(tempFilePath, jsonlData, "utf-8");

    // 上傳文件到 OpenAI
    const response = await openai.files.create({
      file: fs.createReadStream(tempFilePath),
      purpose: "fine-tune",
    });

    const fineTune = await openai.fineTuning.jobs.create({
      training_file: response.id,
      model: "gpt-3.5-turbo-0125",
    });

    const job = await openai.fineTuning.jobs.retrieve(fineTune.id);
    console.log(job.status);

    // 返回文件 ID 和其他相關信息
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error("處理數據或上傳文件時出錯:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  } finally {
    // 在 finally 塊中嘗試刪除臨時文件
    try {
      await fsPromises.unlink(tempFilePath);
      console.log("Temporary file deleted successfully");
    } catch (unlinkError) {
      if (unlinkError.code !== "ENOENT") {
        console.warn("Failed to delete temporary file:", unlinkError);
      }
    }
  }
}
