import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Box } from '@mui/material';
import { Email, Person, Message } from '@mui/icons-material';
import axios from 'axios';

const ContactForm = () => {
    const contactinitialvalue={
        name:'',
        email:'',
        message:''
    }

    const[data,setData]=useState(contactinitialvalue);

    const handleChange = ((e) => {
        // console.log(data)
        setData({...data,[e.target.name]:e.target.value})
    }
    )

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            let response=await axios.post('http://localhost:5000/contact',data)
            if(response.status===200){
                alert(response.data)
            }
            else{
                alert(response.data)
            }
        }
        catch(err){
            alert(err.message)
        }
    };

    return (
        <Container maxWidth="sm" style={{
            marginTop: '50px', border: '1px solid #878787', height: '500px', borderRadius: '10px', '@media (max-width:202px)': {
                height: '550px',
            }
        }}>
            <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '40px', fontWeight: 600, fontSize: '38px' }}>
                Contact Us
            </Typography>
            <Box sx={{ mt: 3 }} style={{ margin: '20px' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} style={{ marginTop: '10px' }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="name"
                                name="name"
                                onChange={handleChange}
                                label="Your Name"
                                variant="standard"
                                InputProps={{
                                    startAdornment: <Person />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: '10px' }}>
                            <TextField
                                fullWidth
                                required
                                id="email"
                                name="email"
                                onChange={handleChange}
                                label="Your Email"
                                type="email"
                                variant="standard"
                                InputProps={{
                                    startAdornment: <Email />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: '10px' }}>
                            <TextField
                                fullWidth
                                required
                                id="message"
                                name="message"
                                onChange={handleChange}
                                label="Your Message"
                                multiline
                                rows={4}
                                variant="standard"
                                InputProps={{
                                    startAdornment: <Message />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: '10px' }}>
                            <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth style={{ height: '55px', borderRadius: '10px' }}>
                                Send Message
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default ContactForm;
