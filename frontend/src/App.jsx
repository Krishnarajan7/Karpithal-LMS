import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/ui/navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Teach from "./pages/Teach";
import About from "./pages/About";
import Business from "./pages/Business";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

const AppContent = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowSignIn(false);
  };

  const handleBackToHome = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    navigate('/');
  };

  if (showSignIn) {
    return (
      <SignIn 
        onBack={handleBackToHome} 
        onSignUpClick={handleSignUpClick} 
      />
    );
  }

  if (showSignUp) {
    return (
      <SignUp 
        onBack={handleBackToHome} 
        onSignInClick={handleSignInClick} 
      />
    );
  }

  return (
    <>
      <Navbar 
        onSignInClick={handleSignInClick}
        onSignUpClick={handleSignUpClick}
      />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/teach" element={<Teach />} />
        <Route path="/about" element={<About />} />
        <Route path="/business" element={<Business />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;