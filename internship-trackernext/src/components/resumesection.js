"use client";

import { useState } from "react";
import ResumeUpload from "@/components/resumeupload";
import { Box, Typography, Paper, Stack } from "@mui/material";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function ResumeSection() {
  const [dashboard, setDashboard] = useState(false);

  return ( 
    <div style={{ paddingBottom: "5rem" }}>
      {!dashboard && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "20px",
              gap: 3,
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              How to Get Started
            </Typography>

            <Stack spacing={2} sx={{ width: "100%" }}>
              <Paper
                elevation={3}
                sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}
              >
                <InsertLinkIcon color="primary" fontSize="large" />
                <Typography variant="body1">
                  Paste the job link you want to track.
                </Typography>
              </Paper>

              <Paper
                elevation={3}
                sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}
              >
                <UploadFileIcon color="secondary" fontSize="large" />
                <Typography variant="body1">
                  Upload your resume (PDF only).
                </Typography>
              </Paper>

              <Paper
                elevation={3}
                sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}
              >
                <DashboardIcon color="success" fontSize="large" />
                <Typography variant="body1">
                  View and track all your applications in the dashboard.
                </Typography>
              </Paper>
            </Stack>

            <Typography
              variant="body2"
              sx={{ color: "gray", marginTop: "15px", fontStyle: "italic" }}
            >
              You can always upload a new resume later from your dashboard.
            </Typography>
          </Box>

          <ResumeUpload onUploadSucess={() => setDashboard(true)} />
        </>
      )}

      {dashboard && (
        <div>
          <GridLayout />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: { xs: 0, md: 3 },
              paddingTop: "15px",
            }}
          >
            <Typography variant="h6">Upload a new resume</Typography>
          </Box>

          <ResumeUpload onUploadSucess={() => {}} />
        </div>
        
      )}
    </div>
  );
}
