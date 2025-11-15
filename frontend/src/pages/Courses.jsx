import React from 'react';
import Footer from '@/components/Footer';
import { Gallery6 } from '@/components/ui/gallery6';

const Courses = () => {
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
    {
      id: "course-6",
      title: "Cloud Computing Essentials",
      summary: "Learn AWS, Azure, and cloud architecture to deploy scalable applications.",
      url: "#",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-4">All Courses</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Explore our comprehensive course library
        </p>
      </div>
      <Gallery6 
        heading="Featured Courses"
        demoUrl="#"
        items={coursesData}
      />
      <Footer />
    </div>
  );
};

export default Courses;
