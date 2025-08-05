import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RAG.WTF - An Open-Source, Modular RAG Application",
  description: "RAG.WTF is a comprehensive, Flutter-based Retrieval-Augmented Generation (RAG) application built to be open-source, modular, and easy to deploy. What's The File? Wow, That's Fast!",
  keywords: ["RAG", "Flutter", "Dart", "Retrieval-Augmented Generation", "Open Source", "Modular", "SurrealDB", "Ollama", "AI", "LLM"],
  authors: [{ name: "Lim Chee Kin" }],
  openGraph: {
    title: "RAG.WTF - Open-Source RAG Application",
    description: "An Open-Source, Modular RAG Application built with Flutter. What's The File? Wow, That's Fast!",
    url: "https://rag.wtf",
    siteName: "RAG.WTF",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RAG.WTF - Open-Source RAG Application",
    description: "An Open-Source, Modular RAG Application built with Flutter. What's The File? Wow, That's Fast!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
