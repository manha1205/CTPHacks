'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/createEmotionCache';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const clientSideEmotionCache = createEmotionCache();
const theme = createTheme();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={theme}>
              <CssBaseline />

              {/* 🔹 Header with Clerk auth */}
              <header className="flex justify-end items-center p-4 gap-4 h-16">
                <SignedOut>
                  <SignInButton />
                  <SignUpButton>
                    <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </header>

              {/* 🔹 Main content */}
              {children}
            </ThemeProvider>
          </CacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
