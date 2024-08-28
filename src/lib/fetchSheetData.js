export async function fetchSheetData() {
  try {
    console.log('Fetching sheet data...');
    const response = await fetch('/api/getSheetData');
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response not OK. Status:', response.status, 'Text:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Data received:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchSheetData:', error);
    throw new Error('Failed to fetch sheet data: ' + error.message);
  }
}