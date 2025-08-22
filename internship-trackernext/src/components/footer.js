"use client";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        backgroundColor: "#f9f9f9",
        borderTop: "1px solid #e0e0e0",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} <b>TernTrack</b>. All rights reserved.
      </Typography>
      <Typography variant="caption" color="text.disabled">
        Helping you track applications smarter ✨
      </Typography>
    </Box>
  );
}
