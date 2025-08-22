// pages/features.js
import React from "react";
import { Box, Grid, Card, CardContent, Typography, Chip } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function FeaturesPage() {
  const features = [
    {
      title: "AI Resume Grading",
      description:
        "Upload your resume and a job listing, and get instant AI-powered feedback on how well your resume matches the role. Receive tailored suggestions to improve your chances.",
      icon: <AutoAwesomeIcon color="primary" sx={{ fontSize: 40 }} />,
      badge: "New",
    },
    {
      title: "Internship Tracker",
      description:
        "Easily manage your internship applications, deadlines, and statuses all in one place. Stay organized and never miss an opportunity.",
      icon: <WorkIcon color="primary" sx={{ fontSize: 40 }} />,
      badge: "Essential",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff", px: { xs: 2, md: 6 }, py: 8 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Our Features
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={6} maxWidth="600px">
        We help students and job seekers stand out with AI-powered tools and
        smart organization.
      </Typography>

      <Grid container spacing={4}>
        {features.map((feature, idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 3,
                "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
                transition: "all 0.3s ease",
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  {feature.icon}
                  <Box>
                    <Typography variant="h5">{feature.title}</Typography>
                    <Chip label={feature.badge} color="secondary" size="small" sx={{ mt: 1 }} />
                  </Box>
                </Box>
                <Typography color="text.secondary">{feature.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
