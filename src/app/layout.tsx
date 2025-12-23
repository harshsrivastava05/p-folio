import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harsh Srivastava | Full Stack Engineer",
  description: "Portfolio of Harsh Srivastava - Full Stack Engineer specializing in Next.js, AI Agents, and Scalable Backend Systems.",
  keywords: ["Harsh Srivastava", "Full Stack Engineer", "Next.js", "AI", "Portfolio", "RAG", "Agentic AI"],
  authors: [{ name: "Harsh Srivastava", url: "https://github.com/harshsrivastava05" }],
  creator: "Harsh Srivastava",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
