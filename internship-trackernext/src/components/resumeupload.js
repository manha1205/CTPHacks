"use client";
import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

export default function ResumeUpload({ onUploadSucess }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_url", "https://example.com/job"); 
    try {
      const res = await fetch("http://localhost:80/resume-uploader", {
        method: "POST",
        body: formData, // browser sets headers automatically
      });

      if (res.ok) {
        const data = await res.json();
        setStatus("Uploaded Successfully!");
        if (onUploadSucess) {
          onUploadSucess(data.result); 
        }
      } else {
        setStatus("Error Upload Failed");
      }
    } catch (err) {
      console.error(err);
      setStatus("An error occurred");
    }
  };

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <Button variant="outlined" component="label">
          {file ? file.name : "Choose Resume"}
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={handleFileChange}
          />
        </Button>

        <Button type="submit" variant="contained" sx={{ ml: 2 }}>
          Upload Resume
        </Button>
      </form>

      {status && (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          {status}
        </Typography>
      )}
    </Box>
  );
}
