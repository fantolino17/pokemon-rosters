// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Fonts for Material UI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const defaultTheme = createTheme();
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <CssBaseline />
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
  </QueryClientProvider>
);
