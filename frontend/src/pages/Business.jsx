import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, TrendingUp, Shield, Award, BarChart, Briefcase, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Business = () => {
  const features = [
    {
      icon: Users,
      title: 'Team Learning',
      description: 'Empower your team with access to 100,000+ courses'
    },
    {
      icon: BarChart,
      title: 'Analytics & Insights',
      description: 'Track progress and measure skill development'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security and compliance standards'
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Industry-recognized certificates for your team'
    }
  ];

  const benefits = [
    'Unlimited access to our entire course library',
    'Customized learning paths for your organization',
    'Dedicated success manager',
    'Advanced analytics and reporting',
    'SSO and LMS integrations',
    'Priority 24/7 support'
  ];

  const companies = [
    { name: 'TechCorp', logo: '🏢' },
    { name: 'InnovateCo', logo: '💡' },
    { name: 'GlobalTech', logo: '🌐' },
    { name: 'FutureWorks', logo: '🚀' }
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
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-6">
                <Briefcase className="w-4 h-4 mr-2" />
                Karpithal for Business
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Upskill Your Team with World-Class Training
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Transform your workforce with comprehensive learning solutions. 
                Give your team access to cutting-edge courses and build the skills 
                that drive business success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Request Demo
                </Button>
                <Button size="lg" variant="outline">
                  Get Pricing
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" 
                alt="Business team" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Enterprise Solutions for Modern Teams
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything your organization needs to build a culture of continuous learning
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-card hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Why Leading Companies Choose Us
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of organizations that trust Karpithal to develop 
                their workforce and stay ahead of the competition.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-card-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop" 
                alt="Team learning" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">12K+</div>
              <div className="text-muted-foreground">Enterprise Clients</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">85%</div>
              <div className="text-muted-foreground">Skill Development</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">2M+</div>
              <div className="text-muted-foreground">Corporate Learners</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12">
            {companies.map((company, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl mb-2">{company.logo}</div>
                <div className="text-sm text-muted-foreground">{company.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Workforce?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how Karpithal can help your organization achieve its learning goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Schedule a Demo
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Business;
