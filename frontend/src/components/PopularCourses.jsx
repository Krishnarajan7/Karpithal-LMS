import React, { useState } from 'react';
import { Star, Users, Clock, Play, BookOpen, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const courses = [
  {
    id: 1,
    title: 'Complete React Developer Bootcamp',
    instructor: 'Sarah Johnson',
    instructorImage: '👩‍💻',
    rating: 4.9,
    reviewCount: 2847,
    students: 12450,
    duration: '42 hours',
    lessons: 156,
    price: 89,
    originalPrice: 129,
    category: 'Programming',
    level: 'Intermediate',
    badge: 'Bestseller',
    badgeColor: 'bg-secondary',
    description: 'Master React from basics to advanced concepts with real-world projects',
    skills: ['React', 'Redux', 'JavaScript', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    instructor: 'Alex Chen',
    instructorImage: '👨‍🎨',
    rating: 4.8,
    reviewCount: 1923,
    students: 8920,
    duration: '28 hours',
    lessons: 98,
    price: 69,
    originalPrice: 99,
    category: 'Design',
    level: 'Beginner',
    badge: 'Popular',
    badgeColor: 'bg-primary',
    description: 'Learn design principles and create stunning user experiences',
    skills: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
  },
  {
    id: 3,
    title: 'Digital Marketing Mastery',
    instructor: 'Maria Rodriguez',
    instructorImage: '👩‍💼',
    rating: 4.7,
    reviewCount: 3156,
    students: 15680,
    duration: '35 hours',
    lessons: 124,
    price: 79,
    originalPrice: 119,
    category: 'Marketing',
    level: 'Intermediate',
    badge: 'Hot',
    badgeColor: 'bg-red-500',
    description: 'Complete guide to digital marketing strategies and campaigns',
    skills: ['SEO', 'PPC', 'Social Media', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
  },
  {
    id: 4,
    title: 'Python Data Science',
    instructor: 'Dr. Emily Watson',
    instructorImage: '👩‍🔬',
    rating: 4.9,
    reviewCount: 2234,
    students: 11200,
    duration: '48 hours',
    lessons: 189,
    price: 99,
    originalPrice: 159,
    category: 'Data Science',
    level: 'Advanced',
    badge: 'New',
    badgeColor: 'bg-green-500',
    description: 'Master data analysis and machine learning with Python',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
  },
];

const PopularCourses = () => {
  const [hoveredCourse, setHoveredCourse] = useState(null);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredCourse(course.id)}
              onMouseLeave={() => setHoveredCourse(null)}
            >
              {/* Course Image */}
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`${course.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                    {course.badge}
                  </span>
                </div>
                
                {/* Level Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Category */}
                <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">
                  {course.category}
                </div>
                
                {/* Title */}
                <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.skills.slice(0, 3).map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Instructor */}
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{course.instructorImage}</span>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{course.instructor}</div>
                    <div className="text-xs text-gray-600">Course Instructor</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-900">{course.rating}</span>
                    <span className="ml-1">({course.reviewCount.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{(course.students / 1000).toFixed(1)}k students</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${course.originalPrice}</span>
                  </div>
                  <div className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                  </div>
                </div>

                {/* Enroll Button */}
                <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Enroll Now
                </Button>
              </div>
            </div>
          ))}
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