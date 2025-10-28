import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Users, Globe, Award, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We believe education should be accessible to everyone, everywhere'
    },
    {
      icon: Heart,
      title: 'Student-First',
      description: 'Every decision we make puts learner success at the center'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We constantly evolve to deliver the best learning experience'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connecting learners and instructors across the world'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '👩‍💼',
      description: 'Former educator with 15 years of experience'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '👨‍💻',
      description: 'Tech innovator passionate about EdTech'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Content',
      image: '👩‍🎓',
      description: 'Curriculum expert and instructional designer'
    }
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
          
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About Karpithal
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're on a mission to democratize education and empower people to learn 
              anything, anywhere, at their own pace. Since 2020, we've helped millions 
              of students achieve their goals.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-muted-foreground mb-4">
                Karpithal was founded with a simple belief: everyone deserves access to 
                quality education. What started as a small platform with just 10 courses 
                has grown into a global learning community.
              </p>
              <p className="text-muted-foreground mb-4">
                Today, we host over 100,000 courses taught by expert instructors, 
                serving millions of students in 190+ countries. But our mission remains 
                the same - to make learning accessible, affordable, and impactful.
              </p>
              <p className="text-muted-foreground">
                We're proud to be a platform where knowledge flows freely, where 
                experts share their passion, and where learners transform their lives.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="Team collaboration" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-card hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Impact
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">5M+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div className="p-6">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">100K+</div>
              <div className="text-muted-foreground">Courses Available</div>
            </div>
            <div className="p-6">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Expert Instructors</div>
            </div>
            <div className="p-6">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">190+</div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate individuals dedicated to transforming education
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-card hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-card-foreground mb-1">{member.name}</h3>
                <div className="text-primary font-semibold mb-3">{member.role}</div>
                <p className="text-muted-foreground">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Be part of a community that's transforming lives through education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Start Learning
            </Button>
            <Button size="lg" variant="outline">
              Teach on Karpithal
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
