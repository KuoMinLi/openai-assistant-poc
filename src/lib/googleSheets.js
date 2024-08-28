import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

export async function getSheetData() {
  try {
    console.log("Initializing Google Sheets connection...");
    const base64EncodedKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY_BASE64;
    const decodedKey = Buffer.from(base64EncodedKey, 'base64').toString('utf-8');

    console.log("Decoded key:", decodedKey);
    const jwt = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: decodedKey,
      scopes: SCOPES,
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_SHEET_ID, jwt);
    console.log("Loading document info...");
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    console.log("Fetching rows...");
    const rows = await sheet.getRows();

    const data = rows.map((row) => ({
      prompt: row.get("prompt"),
      completion: row.get("completion"),
    }));

    console.log("Data fetched successfully");
    return data;
  } catch (error) {
    console.error("Error in getSheetData:", error);
    throw error;
  }
}
