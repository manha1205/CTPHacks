"use client";
import React, { useEffect, useState } from 'react'
import { 
    TextField, 
    Button, 
    MenuItem, 
    FormControl, 
    InputLabel, 
    Select, 
    Box, 
    Typography, 
    Container, 
    Paper,
    Grid,
    Modal
} from '@mui/material';

export default function NewJobModal() {

    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState(''); // How do you want to structure the resume and job sections?
    const [dueDate, setDueDate] = useState(''); 
    const [url, setUrl] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [status, setStatus] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            companyName,
            jobTitle,
            jobDescription,
            dueDate, 
            url,
            status,
        };
        const response = await fetch("/jobs", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),})
        const res = await response.json();
        console.log('Form Submitted:', res);
       
    };

    const statusOptions = [
       "unapplied",
        "applied",
        "interview",
        "rejected",
        "offer"
    ];

    return (
        <div>
        <Box sx= {{display: "flex", justifyContent: "center", mt:2}}>
            <Button onClick={handleOpen} variant="contained"
              sx={{
                mt: 4,
                px: 4,
                py: 1.5,
                bgcolor: 'success.main',
                borderRadius: '9999px',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { bgcolor: 'success.dark' },
              }}>Track New Job</Button>
        </Box>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
        <Container component="main" maxWidth="md" sx={{ my: 4 }}>
            <Paper 
                elevation={3} 
                sx={{ 
                    p: { xs: 2, sm: 4 }, 
                    borderRadius: '16px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold'}}>
                    Enter Job Information
                </Typography>
            
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                id="company-name"
                                label="Company Name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                id="job-title"
                                label="Job Title"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="due-date"
                                label="Application Due Date"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="status-select-label">Application Status</InputLabel>
                                <Select
                                    labelId="status-select-label"
                                    id="status-select"
                                    value={status}
                                    label="Job Application Status"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    {statusOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="url"
                                label="Site URL"
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                variant="outlined"
                                placeholder="URL"
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Button 
                                    type="submit" 
                                    sx={{ 
                                        px: 5, 
                                        py: 1.5,
                                        borderRadius: '12px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Save Application
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
        </Modal>
        </div>
    );
    
// oh ok, i dont think mine is right, i cant access the server
// look in slack
}
import { useParams } from "react-router-dom";


export default function viewAllJobs({userid}){
    const {userid}= useParams();
    const[jobs, setJobs]= useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    useEffect(() => {
        const ShowJobs= async() => {
        try{
            setLoading(true); 
            const response = await fetch("https:/user/${user_id}/jobs", {method: "GET", headers :{"Content-Type": "applications/json"},
            });
            const data = await response.json();
            if (!response.ok) throw new Error("Failed to get jobs");
            setJobs(data);
        }catch (e){
                setErr(e.message);
            }
            finally{
                setLoading(false);
        }
    };  ShowJobs();  
    } ,[userid]);
    if (err) return <p> {err}</p>;
    return(<div>
        <h2> Jobs for user {userid}</h2>
        <ul>
            {jobs.map((job) => (
                <li key = {job.id}> 
                {job.title} at {job.company}- {job.status}, due {job["due date"]}
                </li>
            ))}
        </ul>
    </div>);
}       


    