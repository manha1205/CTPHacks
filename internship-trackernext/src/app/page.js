'use client'
import { useRouter } from 'next/navigation';
import { Button, Toolbar, Link, Box } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import HeroSection from '@/components/HeroSection';
import AppBar from '@/components/Appbar';


export default function Home() {
  return (
    <>
      {/* Header with Navigation */}
        <AppBar />
       <HeroSection />
    </>
  );
}
