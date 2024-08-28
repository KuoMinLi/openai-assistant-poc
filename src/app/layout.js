import { Inter } from "next/font/google";
import Header from "./header";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FUTUAL Assistant Test",
  description: "FUTUAL Assistant Test with openai, finetune connect google sheet",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
