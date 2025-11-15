import React from 'react';
import { Search, BookOpen, Users, Award } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: Search,
    title: 'Discover Courses',
    description: 'Browse through our extensive library of premium courses across various categories and skill levels.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    icon: BookOpen,
    title: 'Start Learning',
    description: 'Enroll in courses and begin your learning journey with structured lessons and practical projects.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 3,
    icon: Users,
    title: 'Connect with Mentors',
    description: 'Join live classes, get personalized feedback, and connect with expert mentors in your field.',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 4,
    icon: Award,
    title: 'Earn Certificates',
    description: 'Complete courses and earn industry-recognized certificates to showcase your new skills.',
    color: 'from-orange-500 to-orange-600',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            How&nbsp; 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Karpithal Works
              </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your journey to mastery starts here. Follow these simple steps to transform your skills and career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className="relative text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform translate-x-4 -translate-y-1/2 z-0"></div>
                )}
                
                {/* Step Number */}
                <div className="relative z-10 mb-6">
                  <div className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                    {step.id}
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-gradient-card rounded-radius-lg p-8 max-w-4xl mx-auto shadow-lg">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of learners who have already transformed their careers with Karpithal's premium courses and expert mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero">
                Get Started Today
              </button>
              <button className="btn-outline">
                Browse Free Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;