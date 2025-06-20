import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient  = new QueryClient()
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
       <QueryClientProvider client={queryClient}>
         <App />
         <ReactQueryDevtools initialIsOpen={false} position="bottom"/>
       </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
