'use client';

import { useEffect, useState, useRef } from 'react';
import { fetchSheetData } from './fetchSheetData';

export default function Home() {
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    async function loadData() {
      try {
        const sheetData = await fetchSheetData();
        setData(sheetData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      }
    }
    loadData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Sheet Data</h1>
      {data.map((item, index) => (
        <div key={index}>
          <h2>{item.question}</h2>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
}