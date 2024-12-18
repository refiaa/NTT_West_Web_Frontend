import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid } from '@mui/material';
import { theme } from './theme';
import Header from './components/Layout/Header';
import EventForm from './components/EventForm/EventForm';
import Calendar from './components/Calendar/Calendar';
import AuthForm from './components/Auth/AuthForm';
import EventCreationForm from './components/EventCreation/EventCreationForm';

const DashboardLayout = () => (
    <>
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <EventForm />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Calendar />
                </Grid>
            </Grid>
        </Container>
    </>
);

const EventCreationLayout = () => (
    <>
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <EventCreationForm />
        </Container>
    </>
);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/login" element={<AuthForm />} />
                    <Route path="/create-event" element={<EventCreationLayout />} />
                    <Route path="/dashboard" element={<DashboardLayout />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;