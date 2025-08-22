'use client'
import React from 'react';
import {useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, AppBar, Toolbar, Link, Box } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Appbar() {
    const router = useRouter();
  return (
<AppBar position="static" color="transparent" elevation={0}>
        <Toolbar
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {/* Logo / Brand */}
          <Button
            onClick={() => router.push('/')} 
            sx={{ fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'success.main', fontSize: { xs: "0.75rem", sm: "1.25rem", md: "1.75rem" },}}
          >
            TernTrack
          </Button>

          {/* Navigation Links (centered) */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '3rem'
            }}
          ><SignedIn>
            <Link href="/main" underline="none" color="inherit" variant="body1">
              Dashboard
            </Link>
            <Link href="/resume_grading" underline="none" color="inherit" variant="body1">
              Resume Grade
            </Link>
            </SignedIn>
            <Link href="/features" underline="none" color="inherit" variant="body1">
              Features
            </Link>
          </Box>

          {/* Auth Buttons / User */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <SignedOut>
              <Button
                variant="contained"
                sx={{ backgroundColor: 'black', color: 'white', borderRadius: '9999px' }}
                href="/sign-in"
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: 'black', color: 'white', borderRadius: '9999px' }}
                href="/sign-up"
              >
                Sign Up
              </Button>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            
          </Box>
        </Toolbar>
      </AppBar>
  );}