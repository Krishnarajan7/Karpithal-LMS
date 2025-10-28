import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Video, DollarSign, Users, BookOpen, TrendingUp, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Teach = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Reach Students Worldwide',
      description: 'Connect with millions of learners across the globe'
    },
    {
      icon: DollarSign,
      title: 'Earn Income',
      description: 'Generate revenue from your expertise and passion'
    },
    {
      icon: Video,
      title: 'Professional Tools',
      description: 'Access best-in-class video and course creation tools'
    },
    {
      icon: Award,
      title: 'Build Your Brand',
      description: 'Establish yourself as an expert in your field'
    }
  ];

  const steps = [
    'Plan your curriculum and create engaging content',
    'Record your video lessons with our easy-to-use tools',
    'Launch your course and start reaching students',
    'Earn money and build your reputation'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onSignInClick={() => window.location.href = '/signin'}
        onSignUpClick={() => window.location.href = '/signup'}
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Teach What You Love
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Share your knowledge and reach millions of students around the world. 
                Join our community of expert instructors and make an impact.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Teaching Today
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop" 
                alt="Teaching" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Teach on Karpithal?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of instructors building successful teaching careers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-card hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How to Get Started
            </h2>
            <p className="text-lg text-muted-foreground">
              Creating your course is simple and straightforward
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-card rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-lg text-card-foreground pt-1">{step}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Begin Your Teaching Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Instructors</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">5M+</div>
              <div className="text-muted-foreground">Students Enrolled</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">$100M+</div>
              <div className="text-muted-foreground">Instructor Earnings</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Teach;
