import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/about" element={<Index />} /> {/* Placeholder */}
          <Route path="/admissions" element={<Index />} /> {/* Placeholder */}
          <Route path="/courses" element={<Index />} /> {/* Placeholder */}
          <Route path="/courses/fashion" element={<Index />} /> {/* Placeholder */}
          <Route path="/courses/interior" element={<Index />} /> {/* Placeholder */}
          <Route path="/explore" element={<Index />} /> {/* Placeholder */}
          <Route path="/explore/gallery" element={<Index />} /> {/* Placeholder */}
          <Route path="/explore/events" element={<Index />} /> {/* Placeholder */}
          <Route path="/contact" element={<Index />} /> {/* Placeholder */}
          <Route path="/apply" element={<Index />} /> {/* Placeholder */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;