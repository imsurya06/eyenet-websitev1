import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Admissions from "./pages/Admissions";
import Explore from "./pages/Explore";
import StudentsZone from "./pages/StudentsZone";
import Infrastructure from "./pages/Infrastructure";
import NewsEvents from "./pages/NewsEvents";
import FashionDesignCourses from "./pages/FashionDesignCourses";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import ComputerCourses from "./pages/ComputerCourses"; // Import the new page
import Footer from "./components/Footer";
import { MadeWithDyad } from "@/components/made-with-dyad";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/fashion-design" element={<FashionDesignCourses />} />
          <Route path="/courses/fashion-design/:slug" element={<CourseDetailsPage />} />
          <Route path="/courses/computer-courses" element={<ComputerCourses />} /> {/* Add the new route here */}
          <Route path="/courses/computer-courses/:slug" element={<CourseDetailsPage />} /> {/* Dynamic route for computer courses */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/students-zone" element={<StudentsZone />} />
          <Route path="/explore/infrastructure" element={<Infrastructure />} />
          <Route path="/explore/gallery" element={<Gallery />} />
          <Route path="/explore/news-events" element={<NewsEvents />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <MadeWithDyad />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;