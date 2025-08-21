'use client'
import { useState } from "react";
import AppBar from '@/components/Appbar';
import MainHeroSection from '@/components/mainhero';
import ResumeUpload from '@/components/resumeupload';
import { Button, Toolbar, Link, Box, Typography } from '@mui/material';

export default function AppHome() {
    const [dashboard, setDashboard] = useState(false)
  return (
    <>
      <AppBar />
      <MainHeroSection />
      {!dashboard  && (
    <>
    <Box sx ={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: { xs: 0, md: 3 },
        paddingTop: '15px'
    }}>
    <Typography variant= 'h5'sx={{}}>Instructions</Typography>
    </Box>
      <ResumeUpload onUploadSucess = {() => setDashboard (true)} />
    </>
      )}

      {dashboard && (
        <div>
            <H1>hello</H1>
        </div>
      )}
    </>
  );
}
