import React from 'react';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import { Gallery6 } from '@/components/ui/gallery6';
import { Pricing } from '@/components/ui/pricing';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  const handleGetStarted = () => {
    // Navigate to sign up - handled by App component
    window.scrollTo(0, 0);
  };
  
  const handleExploreCourses = () => {
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const coursesData = [
    {
      id: "course-1",
      title: "Web Development Bootcamp",
      summary: "Master HTML, CSS, JavaScript, and modern frameworks to build stunning websites from scratch.",
      url: "#",
      image: "/placeholder.svg",
    },
    {
      id: "course-2",
      title: "Data Science Fundamentals",
      summary: "Learn Python, statistics, and machine learning to analyze data and build predictive models.",
      url: "#",
      image: "/placeholder.svg",
    },
    {
      id: "course-3",
      title: "Digital Marketing Mastery",
      summary: "Discover SEO, social media marketing, and content strategy to grow your online presence.",
      url: "#",
      image: "/placeholder.svg",
    },
    {
      id: "course-4",
      title: "Mobile App Development",
      summary: "Build native iOS and Android apps using React Native and Flutter frameworks.",
      url: "#",
      image: "/placeholder.svg",
    },
    {
      id: "course-5",
      title: "UI/UX Design Principles",
      summary: "Create beautiful, user-friendly interfaces using design thinking and modern tools.",
      url: "#",
      image: "/placeholder.svg",
    },
  ];

  const pricingPlans = [
    {
      name: "STARTER",
      price: "29",
      yearlyPrice: "23",
      period: "per month",
      features: [
        "Access to 10 courses",
        "Basic support",
        "Community forum access",
        "Mobile app access",
        "Course certificates",
      ],
      description: "Perfect for individuals starting their learning journey",
      buttonText: "Get Started",
      href: "/sign-up",
      isPopular: false,
    },
    {
      name: "PROFESSIONAL",
      price: "79",
      yearlyPrice: "63",
      period: "per month",
      features: [
        "Access to all courses",
        "Priority support",
        "1-on-1 mentoring sessions",
        "Career guidance",
        "Project reviews",
        "Exclusive webinars",
        "Downloadable resources",
      ],
      description: "Ideal for professionals advancing their careers",
      buttonText: "Start Learning",
      href: "/sign-up",
      isPopular: true,
    },
    {
      name: "ENTERPRISE",
      price: "199",
      yearlyPrice: "159",
      period: "per month",
      features: [
        "Everything in Professional",
        "Custom learning paths",
        "Team management tools",
        "Dedicated account manager",
        "Advanced analytics",
        "API access",
        "Custom integrations",
        "SLA agreement",
      ],
      description: "For organizations looking to upskill their teams",
      buttonText: "Contact Sales",
      href: "/business",
      isPopular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <Hero 
        onGetStarted={handleGetStarted}
        onExploreCourses={handleExploreCourses}
      />
      <div id="courses">
        <FeaturedCategories />
        <Gallery6 
          heading="Popular Courses"
          demoUrl="#"
          items={coursesData}
        />
      </div>
      <HowItWorks />
      <Pricing 
        plans={pricingPlans}
        title="Choose Your Learning Path"
        description="Flexible pricing for individuals and teams\nAll plans include lifetime access to purchased courses"
      />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
