import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm';
import EventCreationPage from './components/Event/EventCreationPage';
import Header from './components/Layout/Header';
import { theme } from './theme.jsx';

const Layout = ({ children }) => (
    <>
        <Header />
        <Container
            maxWidth={false}
            sx={{
                maxWidth: 'lg',
                minHeight: 'calc(100vh - 64px)',
                backgroundColor: 'background.default',
            }}
        >
            {children}
        </Container>
    </>
);

const ProtectedRoute = ({ children }) => {
    // TODO: Implement authentication check
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/login" element={<AuthForm />} />
                    <Route
                        path="/dashboard"
                        element={
                            <Layout>
                                <EventCreationPage />
                            </Layout>
                        }
                    />
                    <Route
                        path="/events/:eventId"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    {/* TODO: Event Detail Page implementation needed */}
                                    <div>Event Detail Page</div>
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/dashboard" replace />}
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;