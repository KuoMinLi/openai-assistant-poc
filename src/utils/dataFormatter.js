export function formatDataForOpenAI(sheetData) {
  return sheetData.map((item) => ({
    prompt: item.prompt,
    completion: item.completion,
  }));
}
