'use client';
import { useRouter } from 'next/navigation';
import { Button, Toolbar, Link, Box } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import HeroSection from '@/components/HeroSection';
import AppBar from '@/components/Appbar';
import Footer from '@/components/footer'
import LandingBody from '@/components/landingbody';


export default function Home() {
  return (
    <>
      {/* Header with Navigation */}
        <AppBar />
       <HeroSection />
       <Footer />
       <LandingBody />
    </>
  );
}
