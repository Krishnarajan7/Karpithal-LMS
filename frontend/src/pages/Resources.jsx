import React from 'react';
import Footer from '@/components/Footer';
import { BookOpen, FileText, Video, Code } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Study Guides",
      description: "Comprehensive guides for all courses",
      link: "#"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Documentation",
      description: "Detailed documentation and references",
      link: "#"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Tutorials",
      description: "Step-by-step video lessons",
      link: "#"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Code Examples",
      description: "Real-world code samples and projects",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
        <p className="text-muted-foreground text-lg mb-12">
          Everything you need to succeed in your learning journey
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resources.map((resource, index) => (
            <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-primary mb-4">{resource.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
              <p className="text-muted-foreground">{resource.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
