"use client"
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { initAmplitude } from "@/lib/amplitude";
import { AstrologyProvider } from "@/context/AstrologyContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {

    React.useEffect(() => {
      initAmplitude();
    }, []);
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AstrologyProvider>
          {children}
        </AstrologyProvider>
      </body>
    </html>
  );
}
