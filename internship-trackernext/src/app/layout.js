'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/createEmotionCache';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const clientSideEmotionCache = createEmotionCache();
const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff", // page background
      paper: "#ffffff",   // surfaces (AppBar, cards, etc.)
    },
    text: {
      primary: "#000000",
    },
  },
});


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         style={{ backgroundColor: "#ffffff", color: "#000000" }}>
          <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </CacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
