import { NextResponse } from 'next/server';
import { getSheetData } from '@/lib/googleSheets';

export async function GET() {
  try {
    const data = await getSheetData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch sheet data' }, { status: 500 });
  }
}