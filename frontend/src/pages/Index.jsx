import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import PopularCourses from '@/components/PopularCourses';
import PricingCards from '@/components/PricingCards';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const handleSignInClick = () => setCurrentPage('signin');
  const handleSignUpClick = () => setCurrentPage('signup');
  const handleBackToHome = () => setCurrentPage('home');
  const handleGetStarted = () => setCurrentPage('signup');
  const handleExploreCourses = () => {
    // Scroll to courses section or navigate
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentPage === 'signin') {
    return (
      <SignIn 
        onBack={handleBackToHome} 
        onSignUpClick={handleSignUpClick} 
      />
    );
  }

  if (currentPage === 'signup') {
    return (
      <SignUp 
        onBack={handleBackToHome} 
        onSignInClick={handleSignInClick} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onSignInClick={handleSignInClick}
        onSignUpClick={handleSignUpClick}
      />
      <Hero 
        onGetStarted={handleGetStarted}
        onExploreCourses={handleExploreCourses}
      />
      <div id="courses">
        <FeaturedCategories />
        <PopularCourses />
      </div>
      <PricingCards />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;