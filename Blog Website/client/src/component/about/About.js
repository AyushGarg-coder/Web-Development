// AboutUsPage.js
import React from 'react';
import { Container, Typography, Grid, Box, Paper } from '@mui/material';
import { Business, Description, LocationOn, Phone, Email } from '@mui/icons-material';

const AboutUsPage = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
            <Typography variant="h2" align="center" gutterBottom>
                About Us
            </Typography>

            <Grid container spacing={4} style={{ marginBottom: '20px' }}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', minHeight: '300px' }}>
                        <Typography variant="h4" gutterBottom>
                            Company Overview
                        </Typography>
                        <Typography variant="body1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in magna nec nisi suscipit
                            euismod vel vel nulla.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', minHeight: '300px' }}>
                        <Typography variant="h4" gutterBottom>
                            Mission Statement
                        </Typography>
                        <Typography variant="body1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in magna nec nisi suscipit
                            euismod vel vel nulla.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', minHeight: '300px' }}>
                        <Typography variant="h4" gutterBottom>
                            Contact Information
                        </Typography>
                        <Typography variant="body1">
                            <Box display="flex" alignItems="center">
                                <Business fontSize="large" />
                                <Box ml={2}>
                                    Company Name
                                    <Typography variant="body2">
                                        123 Company Street, City, Country
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center" mt={2}>
                                <Phone fontSize="large" />
                                <Box ml={2}>
                                    Phone Number
                                    <Typography variant="body2">
                                        +1 234 567 890
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center" mt={2}>
                                <Email fontSize="large" />
                                <Box ml={2}>
                                    Email Address
                                    <Typography variant="body2">
                                        contact@example.com
                                    </Typography>
                                </Box>
                            </Box>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', minHeight: '300px' }}>
                        <Typography variant="h4" gutterBottom>
                            Company Photos
                        </Typography>
                        <Typography variant="body1">
                            Insert company photos or galleries here.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutUsPage;
