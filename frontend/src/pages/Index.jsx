import React from 'react';
import Hero from '@/components/Hero';
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';
import { Gallery6 } from '@/components/ui/gallery6';
import { Pricing } from '@/components/ui/pricing';
import HowItWorks from '@/components/HowItWorks';
import { Testimonials } from '@/components/ui/testimonials';
import { CustomersSection } from '@/components/ui/customers-section';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  IconCode, 
  IconPalette, 
  IconChartBar, 
  IconRocket,
  IconBrain,
  IconCamera,
  IconMusic,
  IconLanguage 
} from '@tabler/icons-react';

const Index = () => {
  const handleGetStarted = () => {
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

  const categoryFeatures = [
    {
      title: "Web Development",
      description: "Master HTML, CSS, JavaScript, and modern frameworks to build stunning websites.",
      icon: <IconCode className="h-6 w-6" />,
      href: "/courses",
    },
    {
      title: "Design & UX",
      description: "Learn design principles, UI/UX best practices, and modern design tools.",
      icon: <IconPalette className="h-6 w-6" />,
      href: "/courses",
    },
    {
      title: "Data Science",
      description: "Analyze data, build models, and unlock insights with Python and machine learning.",
      icon: <IconChartBar className="h-6 w-6" />,
      href: "/courses",
    },
    {
      title: "Digital Marketing",
      description: "Grow your online presence with SEO, social media, and content strategy.",
      icon: <IconRocket className="h-6 w-6" />,
      href: "/courses",
    },
    {
      title: "Artificial Intelligence",
      description: "Explore AI, machine learning, and neural networks to build intelligent systems.",
      icon: <IconBrain className="h-6 w-6" />,
      href: "/courses",
    },
    {
      title: "Photography",
      description: "Capture stunning images and master photography techniques and editing.",
      icon: <IconCamera className="h-6 w-6" />,
      href: "/courses",
    },
    {
      title: "Music Production",
      description: "Create professional music with production techniques and software.",
      icon: <IconMusic className="h-6 w-6" />,
      href: "/courses",
    },
    {
      title: "Language Learning",
      description: "Master new languages with proven methods and interactive lessons.",
      icon: <IconLanguage className="h-6 w-6" />,
      href: "/courses",
    },
  ];

  const customers = [
    {
      src: "https://html.tailus.io/blocks/customers/nvidia.svg",
      alt: "Nvidia Logo",
      height: 20,
    },
    {
      src: "https://html.tailus.io/blocks/customers/column.svg",
      alt: "Column Logo",
      height: 16,
    },
    {
      src: "https://html.tailus.io/blocks/customers/github.svg",
      alt: "GitHub Logo",
      height: 16,
    },
    {
      src: "https://html.tailus.io/blocks/customers/nike.svg",
      alt: "Nike Logo",
      height: 20,
    },
    {
      src: "https://html.tailus.io/blocks/customers/lemonsqueezy.svg",
      alt: "Lemon Squeezy Logo",
      height: 20,
    },
    {
      src: "https://html.tailus.io/blocks/customers/laravel.svg",
      alt: "Laravel Logo",
      height: 16,
    },
    {
      src: "https://html.tailus.io/blocks/customers/lilly.svg",
      alt: "Lilly Logo",
      height: 28,
    },
    {
      src: "https://html.tailus.io/blocks/customers/openai.svg",
      alt: "OpenAI Logo",
      height: 24,
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <Hero 
        onGetStarted={handleGetStarted}
        onExploreCourses={handleExploreCourses}
      />

      <div id="courses" className="container mx-auto px-4 mt-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Categories
              </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our most popular course categories and start learning today
          </p>
        </div>

        <FeaturesSectionWithHoverEffects features={categoryFeatures} />

        <div className="flex justify-center mt-8 mb-16">
          <Button asChild size="lg">
            <Link to="/courses">Browse All Categories</Link>
          </Button>
        </div>

        <Gallery6
          heading=<span>Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Courses
              </span></span>
          demoUrl="#"
          items={coursesData}
        />
      </div>


      <CustomersSection customers={customers} />

      <HowItWorks />
      <Testimonials />
      <Pricing 
        plans={pricingPlans}
        title=<span>Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Career Path
              </span> </span>
        description="Flexible pricing for individuals and teams\nAll plans include lifetime access to purchased courses"
      />

      <Footer />
    </div>
  );
};

export default Index;
