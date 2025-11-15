import React from 'react';
import Footer from '@/components/Footer';
import { Users, MessageSquare, Calendar, Award } from 'lucide-react';

const Community = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Connect with Peers",
      description: "Join thousands of students learning together"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Discussion Forums",
      description: "Ask questions and share knowledge"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Live Events",
      description: "Participate in webinars and workshops"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Achievements",
      description: "Earn badges and recognition"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
        <p className="text-muted-foreground text-lg mb-12">
          Connect, learn, and grow with fellow students worldwide
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="p-8 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Community;