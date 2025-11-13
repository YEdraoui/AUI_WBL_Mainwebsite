import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import CoopProgram from "./pages/CoopProgram";
import RemoteProgram from "./pages/RemoteProgram";
import AlternanceProgram from "./pages/AlternanceProgram";
import ForEmployers from "./pages/ForEmployers";
import ProgramComparison from "./pages/ProgramComparison";
import Jobs from "./pages/Jobs";
import Resources from "./pages/Resources";
import AdminResources from "./pages/AdminResources";
import NewsAndEvents from "./pages/NewsAndEvents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to handle scrolling to top on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop />
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/coop" element={<CoopProgram />} />
        <Route path="/remote" element={<RemoteProgram />} />
        <Route path="/alternance" element={<AlternanceProgram />} />
        <Route path="/employers" element={<ForEmployers />} />
        <Route path="/compare" element={<ProgramComparison />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/news-events" element={<NewsAndEvents />} />
        <Route path="/admin/resources" element={<AdminResources />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
