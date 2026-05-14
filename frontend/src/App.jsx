import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import SensorAnalytics from './components/pages/SensorAnalytics';
import Alerts from './components/pages/Alerts';
import CloudData from './components/pages/CloudData';
import EmergencyControl from './components/pages/EmergencyControl';
import Reports from './components/pages/Reports';
import Settings from './components/pages/Settings';

// Create a premium dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // Vibrant blue
    },
    secondary: {
      main: '#8b5cf6', // Vibrant purple
    },
    background: {
      default: '#0b0f19',
      paper: '#1e293b',
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    info: {
      main: '#0ea5e9',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <SensorAnalytics />;
      case 'alerts':
        return <Alerts />;
      case 'cloud':
        return <CloudData />;
      case 'emergency':
        return <EmergencyControl />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
        {renderPage()}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
