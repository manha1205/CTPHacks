"use client";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function LandingBody() {
  return (
    <Box component="section" sx={{ py: 10, backgroundColor: "white", paddingBottom: "10rem" }}>
      <Container maxWidth="lg">
        {/* Intro */}
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 800, mb: 2 }}
        >
          Stay Organized. Land Your Dream Job.
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 8, maxWidth: "750px", mx: "auto" }}
        >
          Stop juggling spreadsheets and bookmarks. Track every job, upload
          resumes, and monitor progress—all in one clean dashboard.
        </Typography>

        {/* Features */}
        <Grid container spacing={4} justifyContent="center">
          {/* Top row: 2 boxes */}
          <Grid item xs={12} sm={6} md={5}>
            <Paper
              elevation={3}
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: 4,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
              }}
            >
              <InsertLinkIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Save Job Links
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Paste and track all the jobs you’re applying to in one secure
                place. Never lose a link again.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <Paper
              elevation={3}
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: 4,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
              }}
            >
              <UploadFileIcon color="secondary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Upload Resume
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Keep your resume handy and replace it anytime for faster job
                applications.
              </Typography>
            </Paper>
          </Grid>

          {/* Bottom row: 1 box centered */}
          <Grid item xs={12} sm={8} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: 4,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
              }}
            >
              <DashboardIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Dashboard View
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage all your job applications and track their statuses in a
                simple, visual dashboard.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
