This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Environment Variables Setup Guide

This project requires the following environment variables to be set up for proper functioning. Please ensure these variables are correctly configured before running the project.

### Required Environment Variables

1. `GOOGLE_SHEETS_PRIVATE_KEY`
   - Private key for accessing the Google Sheets API

2. `GOOGLE_SHEETS_PRIVATE_KEY_BASE64`
   - Base64 encoded private key for Google Sheets API authentication.

3. `GOOGLE_SHEETS_CLIENT_EMAIL`
   - Client email for Google Sheets API authentication

4. `GOOGLE_SHEETS_SHEET_ID`
   - ID of the Google Sheets document to be used

5. `OPENAI_API_KEY`
   - Access key for the OpenAI API

6. `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Publishable key for Clerk authentication service

7. `CLERK_SECRET_KEY`
   - Secret key for Clerk authentication service

### Setup Instructions

1. Create a `.env` file in the root directory of the project.
2. Add the above variables to the `.env` file in the following format:

```
GOOGLE_SHEETS_PRIVATE_KEY=your_private_key_here
GOOGLE_SHEETS_CLIENT_EMAIL=your_client_email@example.com
GOOGLE_SHEETS_SHEET_ID=your_sheet_id_here
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

3. Replace `your_xxx_here` with the actual values.
4. Ensure that the `.env` file is added to your `.gitignore` to prevent sensitive information from being committed to version control.

Note: Please keep these keys secure and do not share them with unauthorized individuals.