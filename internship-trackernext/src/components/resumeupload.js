"use client";
import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";


export default function ResumeUpload( { onUploadSucess }) {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("")

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setStatus("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("resume", file)

        try {
            const res = await fetch("api/upload_resume", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                setStatus("Uploaded Successfully!")
            }
            else {
                setStatus("Error Upload Failed")
            }
        } catch (err) {
            console.error(err)
            setStatus("An error occured")
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

        <Button
          type="submit"
          variant="contained"
          sx={{ ml: 2 }}
        >
          Upload Resume
        </Button>
      </form>

      {status && (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          {status}
        </Typography>
      )}
    </Box>
    )
};