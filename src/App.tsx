import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, Box, Typography, CircularProgress } from '@mui/material';
import { theme } from './styles/theme';

// Lazy load CompanySelector for better initial load performance
const CompanySelector = React.lazy(() => import('./components/CompanySelector'));

const App: React.FC = () => {
  return (
    // Apply global theme configuration
    <ThemeProvider theme={theme}>
      {/* Reset default browser styles */}
      <CssBaseline />
      
      {/* Main application container with full viewport height */}
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          bgcolor: 'background.default',
          py: 4, // Vertical padding
        }}
      >
        {/* Content container with max-width constraint */}
        <Container>
          {/* Paper-like container for main content */}
          <Box
            sx={{
              width: '100%',
              p: 4,
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              bgcolor: 'background.paper',
            }}
          >
            {/* Application title/header */}
            <Typography
              variant="h4"
              color="primary"
              align="center"
              sx={{
                fontSize: '2rem',
                mb: 4,
                fontWeight: 600,
              }}
            >
              Vodafone
            </Typography>

            {/* Suspense boundary for lazy-loaded component */}
            <Suspense fallback={
              // Loading spinner centered in viewport
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
              }}>
                <CircularProgress />
              </Box>
            }>
              <CompanySelector />
            </Suspense>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
