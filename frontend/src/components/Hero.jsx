import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  Star,
  Users,
  BookOpen,
  TrendingUp,
  CheckCircle,
  Clock,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = ({ onGetStarted, onExploreCourses }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: CheckCircle,
      title: "Lifetime Access",
      description: "Learn at your own pace",
    },
    {
      icon: Award,
      title: "Certificate",
      description: "Get certified upon completion",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 mentor assistance",
    },
  ];

  const courseTabs = [
    {
      title: "Web Development",
      lessons: 52,
      duration: "42h",
      level: "Beginner to Advanced",
      students: "12,450",
      rating: 4.9,
    },
    {
      title: "Data Science",
      lessons: 48,
      duration: "38h",
      level: "Intermediate",
      students: "8,320",
      rating: 4.8,
    },
    {
      title: "UI/UX Design",
      lessons: 35,
      duration: "28h",
      level: "Beginner",
      students: "15,680",
      rating: 4.9,
    },
  ];

  return (
    <section className="relative pt-20 pb-20 lg:pt-28 lg:pb-32 overflow-hidden">
      {/* Modern Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            className="absolute top-10 left-10 w-20 h-20 text-primary/10"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg
            className="absolute top-32 right-20 w-16 h-16 text-secondary/10"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <polygon points="50,10 90,90 10,90" />
          </svg>
          <svg
            className="absolute bottom-20 left-32 w-12 h-12 text-primary/10"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <rect x="10" y="10" width="80" height="80" rx="10" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div
            className={`text-center lg:text-left transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Trust Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full text-primary text-sm font-semibold mb-6 border border-primary/20">
              <Star className="w-4 h-4 mr-2 text-secondary" />
              Trusted by 50,000+ Students Worldwide
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
              Master Skills for the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Digital Future
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Join the world's largest online learning platform. Access 100,000+
              courses from industry experts and transform your career with
              practical skills.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 mb-6 lg:mb-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center lg:justify-start justify-center sm:justify-start"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 text-sm">
                        {feature.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-8 lg:mb-12 justify-center lg:justify-start">
              <Button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-secondary to-orange-500 hover:from-secondary/90 hover:to-orange-500/90 text-white px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Learning Now
                <ArrowRight className="ml-2 w-4 lg:w-5 h-4 lg:h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={onExploreCourses}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold transition-all duration-300"
              >
                <Play className="mr-2 w-4 lg:w-5 h-4 lg:h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-8 text-center lg:text-left">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                  50K+
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  Active Students
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                  100K+
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  Online Courses
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                  4.9★
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  Average Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Course Preview */}
          <div
            className={`relative mt-8 lg:mt-0 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative px-4 lg:px-0">
              {/* Main Course Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>

                {/* Course Tabs */}
                <div className="relative mb-6">
                  <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
                    {courseTabs.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-200 ${
                          activeTab === index
                            ? "bg-white text-primary shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tab.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Course Content */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {courseTabs[activeTab].title} Masterclass
                        </div>
                        <div className="text-sm text-gray-600">
                          {courseTabs[activeTab].lessons} lessons •{" "}
                          {courseTabs[activeTab].duration}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        $49
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        $199
                      </div>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
                    <div className="text-center">
                      <div className="font-bold text-gray-900">
                        {courseTabs[activeTab].students}
                      </div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">
                        {courseTabs[activeTab].level}
                      </div>
                      <div className="text-xs text-gray-600">Level</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-bold text-gray-900">
                          {courseTabs[activeTab].rating}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                  </div>

                  {/* Progress Preview */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium text-sm">
                          Introduction & Setup
                        </span>
                      </div>
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-sm">
                          Building Your First App
                        </span>
                      </div>
                      <div className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                        Current
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg opacity-60">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="font-medium text-sm">
                          Advanced Concepts
                        </span>
                      </div>
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white py-3 font-semibold shadow-lg">
                    Continue Learning
                  </Button>
                </div>
              </div>

              {/* Floating Achievement Card */}
              <div
                className="absolute -top-2 right-2 sm:-top-4 sm:-right-4 bg-white rounded-lg shadow-lg p-3 sm:p-4 animate-bounce-in scale-90 sm:scale-100"
                style={{ zIndex: 10 }}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-secondary to-orange-500 rounded-lg flex items-center justify-center">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-gray-900">
                      Achievement Unlocked!
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-600">
                      Completed 5 lessons
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Student Card */}
              <div
                className="absolute -bottom-6 left-2 sm:-bottom-6 sm:-left-4 bg-white rounded-lg shadow-lg p-3 sm:p-4 animate-bounce-in scale-90 sm:scale-100"
                style={{ animationDelay: "0.5s", zIndex: 10 }}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-gray-900">
                      250+ students
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-600">
                      joined this week
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
