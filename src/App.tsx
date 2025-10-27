import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar"; // Import the new Navbar
import About from "./pages/About"; // Import new pages
import Courses from "./pages/Courses";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import { MadeWithDyad } from "@/components/made-with-dyad"; // Import MadeWithDyad

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar /> {/* Render Navbar here so it appears on all pages */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MadeWithDyad /> {/* Render MadeWithDyad at the bottom of the app */}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;