import React from 'react';
import { Code, TrendingUp, Palette, Megaphone, Camera, Database, Globe, Shield } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Programming',
    description: 'Build websites, apps, and software',
    icon: Code,
    courseCount: 425,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
  },
  {
    id: 2,
    name: 'Design',
    description: 'Create beautiful digital experiences',
    icon: Palette,
    courseCount: 312,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100',
  },
  {
    id: 3,
    name: 'Marketing',
    description: 'Grow businesses and brands',
    icon: Megaphone,
    courseCount: 298,
    color: 'bg-orange-500',
    lightColor: 'bg-orange-100',
  },
  {
    id: 4,
    name: 'Finance',
    description: 'Master money and investments',
    icon: TrendingUp,
    courseCount: 186,
    color: 'bg-green-500',
    lightColor: 'bg-green-100',
  },
  {
    id: 5,
    name: 'Photography',
    description: 'Capture perfect moments',
    icon: Camera,
    courseCount: 156,
    color: 'bg-pink-500',
    lightColor: 'bg-pink-100',
  },
  {
    id: 6,
    name: 'Data Science',
    description: 'Analyze data, find insights',
    icon: Database,
    courseCount: 234,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-100',
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore thousands of courses across these in-demand skill areas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 ${category.lightColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-6 h-6 ${category.color.replace('bg-', 'text-')}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    {category.courseCount} courses
                  </span>
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:border-primary hover:text-primary transition-colors duration-300">
            Browse All Categories
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;