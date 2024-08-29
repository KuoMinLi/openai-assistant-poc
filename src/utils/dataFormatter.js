export function formatDataForOpenAI(sheetData) {
  return sheetData.map((item, index) => {
    if (!item.prompt || !item.completion) {
      throw new Error(`Item at index ${index} is missing prompt or completion`);
    }
    return {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: item.prompt },
        { role: "assistant", content: item.completion },
      ],
    };
  });
}