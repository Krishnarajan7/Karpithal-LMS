import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Krishnarajan',
    role: 'Full Stack Developer',
    company: 'Tech Innovations Inc.',
    image: '👩‍💻',
    rating: 5,
    content: 'Karpithal completely transformed my career. The React bootcamp was incredibly comprehensive, and the mentorship was invaluable. I landed my dream job just 3 months after completing the course!',
    course: 'Complete React Developer Bootcamp',
  },
  {
    id: 2,
    name: 'Vicky',
    role: 'UX Designer',
    company: 'Creative Studios',
    image: '👨‍🎨',
    rating: 5,
    content: 'The UI/UX design course exceeded my expectations. The projects were real-world applicable, and the feedback from mentors helped me build an outstanding portfolio. Highly recommended!',
    course: 'UI/UX Design Fundamentals',
  },
  {
    id: 3,
    name: 'Jamaliya',
    role: 'Digital Marketing Manager',
    company: 'Growth Marketing Co.',
    image: '👩‍💼',
    rating: 5,
    content: 'The digital marketing course gave me practical strategies I could implement immediately. My campaign performance improved by 300% within the first month of applying what I learned.',
    course: 'Digital Marketing Mastery',
  },
  {
    id: 4,
    name: 'Rajinikanth',
    role: 'Data Scientist',
    company: 'Analytics Pro',
    image: '👨‍🔬',
    rating: 5,
    content: 'The Python Data Science bootcamp was exactly what I needed to transition into data science. The hands-on projects and mentor support made complex concepts easy to understand.',
    course: 'Python Data Science Bootcamp',
  },
  {
    id: 5,
    name: 'Kamal Hassan',
    role: 'Financial Advisor',
    company: 'Wealth Management LLC',
    image: '👩‍💼',
    rating: 5,
    content: 'The financial planning course helped me not only advance my career but also manage my personal finances better. The practical tools and strategies are game-changers.',
    course: 'Financial Planning & Investment',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from learners who transformed their careers with Karpithal
          </p>
        </div>

        <div className="relative">
          <div className="max-w-4xl mx-auto">
            {/* Main Testimonial */}
            <div className="bg-card rounded-radius-lg shadow-premium p-8 lg:p-12 relative animate-scale-in">
              <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/20" />
              
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed mb-6 italic">
                  "{testimonials[currentIndex].content}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-4xl">{testimonials[currentIndex].image}</div>
                  <div className="text-left">
                    <h4 className="font-heading font-semibold text-lg text-foreground">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-sm text-primary font-medium">
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-primary/10 rounded-radius inline-block">
                  <p className="text-sm font-medium text-primary">
                    Course: {testimonials[currentIndex].course}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-card shadow-md hover:shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary scale-125' 
                        : 'bg-muted hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-card shadow-md hover:shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Background Testimonials */}
          <div className="hidden lg:block">
            <div className="absolute top-1/4 -left-8 w-64 bg-card/50 backdrop-blur-sm rounded-radius-lg p-4 shadow-md transform -rotate-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">👨‍💻</span>
                <div>
                  <p className="font-semibold text-sm">Bala</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                "Amazing course content and excellent mentorship!"
              </p>
            </div>
            
            <div className="absolute bottom-1/4 -right-8 w-64 bg-card/50 backdrop-blur-sm rounded-radius-lg p-4 shadow-md transform rotate-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">👩‍🎨</span>
                <div>
                  <p className="font-semibold text-sm">Kannan</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                "Transformed my design skills completely!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;