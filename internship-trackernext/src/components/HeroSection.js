'use client';
import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#f5f7fa',          
        py: { xs: 8, md: 12 },
        mt: { xs: 2, md: 3 },        
        mx: { xs: 0, md: 2 },
        borderRadius: { xs: 0, md: 3 },
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Track your internship applications <br />
              <Box component="span" sx={{ color: 'success.main' }}>
                with AI-powered resume scoring
              </Box>
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, maxWidth: 520 }}>
              One dashboard to plan, apply, and improve—score each application, track statuses & deadlines, and boost your match.
            </Typography>
            <SignedOut>
            <Button
              variant="contained"
              sx={{
                mt: 4,
                px: 4,
                py: 1.5,
                bgcolor: 'success.main',
                borderRadius: '9999px',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { bgcolor: 'success.dark' },
              }}
              href="/sign-up"
            >
              Sign Up
            </Button>
            </SignedOut>
            <SignedIn>
                <Button
              variant="contained"
              sx={{
                mt: 4,
                px: 4,
                py: 1.5,
                bgcolor: 'success.main',
                borderRadius: '9999px',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { bgcolor: 'success.dark' },
              }}
              href="/main"
            >
              Go to Dashboard
            </Button>
            </SignedIn>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '4 / 3',
                bgcolor: '#ffffff',
                borderRadius: 3,
                boxShadow: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Replace with your image if you have one */}
              {/* <Box component="img" src="/hero-graphic.png" alt="Hero" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Illustration / Screenshot
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

    
    </Box>
  );
}
