'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function MainHeroSection() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#f5f7fa',
        mt: { xs: 2, md: 3 },
        mx: { xs: 0, md: 2 },
        borderRadius: { xs: 0, md: 3 },
        height: { xs: 200, md: 300 }, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'success.main' }}>
        Dashboard
      </Typography>
    </Box>
  );
}
