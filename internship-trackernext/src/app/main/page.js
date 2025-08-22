'use client'
import { useState } from "react";
import AppBar from '@/components/Appbar';
import MainHeroSection from '@/components/mainhero';
import ResumeSection from "@/components/resumesection";
import Footer from '@/components/footer'


export default function AppHome() {

  return (
    <>
      <AppBar />
      <MainHeroSection />
      <ResumeSection />
      <Footer />
    </>
  );
}
