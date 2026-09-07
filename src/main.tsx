import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';


// Import the generated route tree
import { routeTree } from './routeTree.gen'
import {serviceInit} from "./authService/FirebaseAuthService.ts";
import ErrorPage from "./ui/page/ErrorPage";

// Create a new router instance
const router = createRouter({ routeTree, defaultNotFoundComponent: () => <ErrorPage />, })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Initialise Firebase Service
serviceInit();

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
      //<StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
      //</StrictMode>,
  )
}