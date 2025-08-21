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
            sx={{ textTransform: 'none', fontSize: '1.25rem', color: 'inherit' }}
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
              gap: '2rem'
            }}
          >
            <Link href="/features" underline="none" color="inherit" variant="body1">
              Features
            </Link>
            <Link href="/contact" underline="none" color="inherit" variant="body1">
              Contact
            </Link>
            <Link href="/about" underline="none" color="inherit" variant="body1">
              About
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