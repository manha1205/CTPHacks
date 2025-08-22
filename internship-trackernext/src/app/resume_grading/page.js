"use client";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import ResumeUpload from "@/components/resumeupload";

export default function ResumeGradeForm() {
  const [result, setResult] = useState("");

  return (
    <>
      <Typography>{result}</Typography>
      <h1>fhjkdsjfds</h1>

      {/* Pass callback so ResumeUpload can set result */}
      <ResumeUpload onUploadSucess={(text) => setResult(text)} />
    </>
  );
}
