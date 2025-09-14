import React, { useState } from "react";
import { Star, Users, Clock, Play, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "Complete React Developer Bootcamp",
    instructor: "Sarah Johnson",
    instructorImage: "👩‍💻",
    rating: 4.9,
    reviewCount: 2847,
    students: 12450,
    duration: "42 hours",
    lessons: 156,
    price: 8900,
    originalPrice: 12900,
    category: "Programming",
    level: "Intermediate",
    badge: "Bestseller",
    badgeColor: "bg-secondary",
    description:
      "Master React from basics to advanced concepts with real-world projects",
    skills: ["React", "Redux", "JavaScript", "Node.js"],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    instructor: "Alex Chen",
    instructorImage: "👨‍🎨",
    rating: 4.8,
    reviewCount: 1923,
    students: 8920,
    duration: "28 hours",
    lessons: 98,
    price: 6900,
    originalPrice: 9900,
    category: "Design",
    level: "Beginner",
    badge: "Popular",
    badgeColor: "bg-primary",
    description: "Learn design principles and create stunning user experiences",
    skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping"],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    instructor: "Maria Rodriguez",
    instructorImage: "👩‍💼",
    rating: 4.7,
    reviewCount: 3156,
    students: 15680,
    duration: "35 hours",
    lessons: 124,
    price: 7900,
    originalPrice: 11900,
    category: "Marketing",
    level: "Intermediate",
    badge: "Hot",
    badgeColor: "bg-red-500",
    description:
      "Complete guide to digital marketing strategies and campaigns",
    skills: ["SEO", "PPC", "Social Media", "Analytics"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "Python Data Science",
    instructor: "Dr. Emily Watson",
    instructorImage: "👩‍🔬",
    rating: 4.9,
    reviewCount: 2234,
    students: 11200,
    duration: "48 hours",
    lessons: 189,
    price: 9900,
    originalPrice: 15900,
    category: "Data Science",
    level: "Advanced",
    badge: "New",
    badgeColor: "bg-green-500",
    description:
      "Master data analysis and machine learning with Python",
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  },
];

const PopularCourses = () => {
  const [hoveredCourse, setHoveredCourse] = useState(null);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Featured Courses
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Most Popular{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Courses
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of students learning from industry experts in our
            top-rated courses
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 flex flex-col"
              onMouseEnter={() => setHoveredCourse(course.id)}
              onMouseLeave={() => setHoveredCourse(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3">
                  <span
                    className={`${course.badgeColor} text-white text-xs font-bold px-2 py-1 rounded-md shadow-md`}
                  >
                    {course.badge}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 text-gray-800 text-xs font-semibold px-2 py-1 rounded-md">
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                {/* Category & Title */}
                <div className="mb-3">
                  <div className="text-xs font-bold text-primary uppercase tracking-wide mb-1">
                    {course.category}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                </div>

                {/* Instructor */}
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg mr-2">
                    {course.instructorImage}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {course.instructor}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-900">
                      {course.rating}
                    </span>
                    <span className="ml-1">
                      ({(course.reviewCount / 1000).toFixed(1)}k)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    <span>{(course.students / 1000).toFixed(1)}k</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-3 h-3 mr-1" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{course.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ₹{course.originalPrice}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                    {Math.round(
                      (1 - course.price / course.originalPrice) * 100
                    )}
                    % OFF
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-auto flex flex-col space-y-2">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary/90 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Enroll Now
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-100 transition-all duration-300"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
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
