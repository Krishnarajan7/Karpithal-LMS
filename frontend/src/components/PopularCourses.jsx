import React, { useState, useEffect, useRef } from 'react';
import { Star, Users, Clock, Play, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const courses = [
  {
    id: 1,
    title: 'NEW! Ultimate AWS Certified Cloud Practitioner CLF-C02 2025',
    instructor: 'Stephane Maarek | AWS Certified Cloud...',
    instructorImage: '👨‍💻',
    rating: 4.7,
    reviewCount: 268500,
    students: 12450,
    duration: '42 hours',
    lessons: 156,
    price: 579,
    originalPrice: 649,
    category: 'Programming',
    level: 'Intermediate',
    badge: 'Bestseller',
    badgeColor: 'bg-secondary',
    description: 'Master React from basics to advanced concepts with real-world projects',
    skills: ['React', 'Redux', 'JavaScript', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    currency: '₹',
  },
  {
    id: 2,
    title: 'Ultimate AWS Certified Solutions Architect Associate 2025',
    instructor: 'Stephane Maarek | AWS Certified Cloud...',
    instructorImage: '👨‍💻',
    rating: 4.7,
    reviewCount: 273000,
    students: 8920,
    duration: '28 hours',
    lessons: 98,
    price: 679,
    originalPrice: 949,
    category: 'Design',
    level: 'Beginner',
    badge: 'Bestseller',
    badgeColor: 'bg-primary',
    description: 'Learn design principles and create stunning user experiences',
    skills: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    currency: '₹',
  },
  {
    id: 3,
    title: 'LLM Engineering: Master Large Language Models & Agents',
    instructor: 'Ligency | Ed Donner',
    instructorImage: '👨‍💼',
    rating: 4.7,
    reviewCount: 20280,
    students: 15680,
    duration: '35 hours',
    lessons: 124,
    price: 529,
    originalPrice: 999,
    category: 'Marketing',
    level: 'Intermediate',
    badge: '',
    badgeColor: 'bg-red-500',
    description: 'Complete guide to digital marketing strategies and campaigns',
    skills: ['SEO', 'PPC', 'Social Media', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    currency: '₹',
  },
  {
    id: 4,
    title: 'The Complete Python Bootcamp From Zero to Hero in Python',
    instructor: 'Jose Portilla Pierian Training',
    instructorImage: '👨‍🔬',
    rating: 4.6,
    reviewCount: 564900,
    students: 11200,
    duration: '48 hours',
    lessons: 189,
    price: 529,
    originalPrice: 499,
    category: 'Data Science',
    level: 'Advanced',
    badge: 'Premium',
    badgeColor: 'bg-green-500',
    description: 'Master data analysis and machine learning with Python',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    currency: '₹',
  },
];

const PopularCourses = () => {
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [api, setApi] = useState(null);
  const carouselRef = useRef(null);

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Featured Courses
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Most Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Courses</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of students learning from industry experts in our top-rated courses
          </p>
        </div>

        <div className="relative" ref={carouselRef}>
          <Carousel
            opts={{
              align: "start",
              loop: false,
              dragFree: true,
              slidesToScroll: 1,
              containScroll: 'trimSnaps',
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="gap-2 md:gap-4">
              {courses.map((course) => (
                <CarouselItem key={course.id} className="flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 min-w-0">
                  <div
                    className="bg-white rounded-xl overflow-hidden h-full flex flex-col max-h-[480px]"
                  >
                    {/* Course Image - No hover effects, no overlay */}
                    <div className="relative h-40 overflow-hidden flex-shrink-0">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Badge - Positioned like bestseller tag in screenshot */}
                      {course.badge && (
                        <div className="absolute top-2 left-2">
                          <span className={`${course.badgeColor} text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg`}>
                            {course.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Course Content - No hover effects */}
                    <div className="p-4 flex-1 flex flex-col">
                      {/* Title - No hover color change */}
                      <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 mb-2">
                        {course.title}
                      </h3>

                      {/* Instructor - Compact */}
                      <div className="flex items-center mb-2">
                        <span className="text-sm mr-2">{course.instructorImage}</span>
                        <div className="text-xs font-medium text-gray-600 truncate">{course.instructor}</div>
                      </div>

                      {/* Stats - Simplified to only rating like screenshot, compact */}
                      <div className="mb-3">
                        <div className="flex items-center text-xs text-gray-600">
                          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                          <span className="font-semibold text-gray-900 mr-1">{course.rating}</span>
                          <span className="text-gray-500">({(course.reviewCount / 1000).toFixed(course.reviewCount % 1000 === 0 ? 0 : 1)}k ratings)</span>
                        </div>
                      </div>

                      {/* Price - No strikethrough */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-gray-900">{course.currency}{course.price}</span>
                          <span className="text-xs text-gray-500 ml-2">{course.currency}{course.originalPrice}</span>
                        </div>
                      </div>

                      {/* Enroll Button - No special hover */}
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg shadow-sm transition-all duration-300 flex-shrink-0 text-sm">
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 z-30 border border-gray-200 transition-all duration-200 h-10 w-10 text-gray-900 hover:text-primary" 
              variant="ghost" 
              size="icon" 
            >
              <ChevronLeft className="h-5 w-5" />
            </CarouselPrevious>
            <CarouselNext 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 z-30 border border-gray-200 transition-all duration-200 h-10 w-10 text-gray-900 hover:text-primary" 
              variant="ghost" 
              size="icon" 
            >
              <ChevronRight className="h-5 w-5" />
            </CarouselNext>
          </Carousel>
        </div>

        <div className="text-center mt-16">
          <Button 
            variant="outline" 
            className="px-8 py-4 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All 100,000+ Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;