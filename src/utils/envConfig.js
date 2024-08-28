export function getDecodedPrivateKey() {
  if (typeof window === 'undefined') {
    // This code will only run on the server side
    const base64EncodedKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY_BASE64;
    if (!base64EncodedKey) {
      throw new Error('GOOGLE_SHEETS_PRIVATE_KEY_BASE64 is not defined in the environment variables.');
    }
    return Buffer.from(base64EncodedKey, 'base64').toString('utf-8');
  }
  // Return null or a placeholder for client-side
  return null;
}