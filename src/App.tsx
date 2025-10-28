import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import ComputerCourses from "./pages/ComputerCourses";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminInfrastructure from "./pages/admin/AdminInfrastructure";
import AdminNewsEvents from "./pages/admin/AdminNewsEvents";
import AdminBlogs from "./pages/admin/AdminBlogs";
import Blogs from "./pages/Blogs";
import Footer from "./components/Footer";
import { MadeWithDyad } from "@/components/made-with-dyad";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

// New component to conditionally render the Navbar
const ConditionalNavbar = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin-dashboard');

  if (isAdminRoute) {
    return null; // Don't render Navbar on admin dashboard routes
  }

  return <Navbar />;
};

// Existing component to conditionally render the Footer
const ConditionalFooter = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin-dashboard');

  if (isAdminRoute) {
    return null; // Don't render footer on admin dashboard routes
  }

  return <Footer />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <ConditionalNavbar /> {/* Use conditional Navbar */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/fashion-design" element={<FashionDesignCourses />} />
            <Route path="/courses/fashion-design/:slug" element={<CourseDetailsPage />} />
            <Route path="/courses/computer-courses" element={<ComputerCourses />} />
            <Route path="/courses/computer-courses/:slug" element={<CourseDetailsPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/students-zone" element={<StudentsZone />} />
            <Route path="/explore/infrastructure" element={<Infrastructure />} />
            <Route path="/explore/gallery" element={<Gallery />} />
            <Route path="/explore/news-events" element={<NewsEvents />} />
            <Route path="/blogs" element={<Blogs />} /> {/* Public blogs page */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            
            {/* Admin Dashboard with nested routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />}>
              <Route index element={<AdminCourses />} /> {/* Default admin page */}
              <Route path="courses" element={<AdminCourses />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="infrastructure" element={<AdminInfrastructure />} />
              <Route path="news-events" element={<AdminNewsEvents />} />
              <Route path="blogs" element={<AdminBlogs />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ConditionalFooter />
          <MadeWithDyad />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;