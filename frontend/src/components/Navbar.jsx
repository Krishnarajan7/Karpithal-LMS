import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronDown, GraduationCap, Code, Palette, TrendingUp, Megaphone, Camera, Database, User, BookOpen, Award, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActionSearchBar } from '@/components/ui/action-search-bar';
import { motion, AnimatePresence } from 'framer-motion';


const Navbar = ({ onSignInClick, onSignUpClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const categories = [
    { name: 'Programming', icon: Code, courses: 425 },
    { name: 'Design', icon: Palette, courses: 312 },
    { name: 'Marketing', icon: Megaphone, courses: 298 },
    { name: 'Finance', icon: TrendingUp, courses: 186 },
    { name: 'Photography', icon: Camera, courses: 156 },
    { name: 'Data Science', icon: Database, courses: 234 },
  ];

  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  const exploreGoals = [
    { name: 'Learn Programming', icon: Code, desc: 'Master coding skills' },
    { name: 'Start a Career', icon: TrendingUp, desc: 'Launch your future' },
    { name: 'Get Certified', icon: Award, desc: 'Earn credentials' },
    { name: 'Build Projects', icon: BookOpen, desc: 'Practice skills' },
  ];

  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Karpithal</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-shrink-0">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                className="flex items-center text-gray-700 hover:text-primary font-medium transition-colors duration-200 text-sm"
              >
                Categories
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              {/* Dropdown Menu */}
              {showCategoriesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-4">
                  <div className="grid grid-cols-2 gap-2 px-4">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <a
                          key={category.name}
                          href="#"
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{category.name}</div>
                            <div className="text-xs text-gray-500">{category.courses} courses</div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 text-sm">
              Teach
            </a>
            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 text-sm">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 text-sm">
              Business
            </a>
          </div>

          {/* Search & Actions */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <ActionSearchBar />
            <Button
              variant="ghost"
              onClick={onSignInClick}
              className="text-gray-700 hover:text-primary whitespace-nowrap text-sm px-3"
            >
              Sign In
            </Button>
            <Button
              onClick={onSignUpClick}
              className="bg-secondary hover:bg-secondary/90 text-white px-5 text-sm whitespace-nowrap"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Modal */}
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowMobileSearch(false)}
            >
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="bg-white p-4 m-4 rounded-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Search Courses</h3>
                  <button
                    onClick={() => setShowMobileSearch(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <ActionSearchBar />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              {/* Exit Button - Fixed at top right corner */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="md:hidden fixed right-4 top-4 z-[60] p-2.5 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </motion.button>
              <motion.div
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="md:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 overflow-y-auto border-r border-gray-100"
              >
                <div className="p-4 space-y-4">
                  {/* Header */}
                  <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                    <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">Karpithal</span>
                  </div>

                  {/* User Profile Section */}
                  <div className="flex items-center space-x-2.5 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Welcome!</p>
                      <p className="text-xs text-gray-600">Sign in to continue learning</p>
                    </div>
                  </div>

                  {/* Explore by Goal */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">Explore by Goal</h3>
                    <div className="space-y-1">
                      {exploreGoals.map((goal) => {
                        const IconComponent = goal.icon;
                        return (
                          <a
                            key={goal.name}
                            href="#"
                            className="flex items-center p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-2.5 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                              <IconComponent className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{goal.name}</div>
                              <div className="text-xs text-gray-600">{goal.desc}</div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Most Popular Categories */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">Most popular</h3>
                    <div className="space-y-1">
                      {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <a
                            key={category.name}
                            href="#"
                            className="flex items-center p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-2.5 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                              <IconComponent className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 text-sm">{category.name}</div>
                              <div className="text-xs text-gray-600">{category.courses} courses</div>
                            </div>
                            <ChevronDown className="w-3.5 h-3.5 text-gray-400 transform -rotate-90" />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* More from Karpithal */}
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-base font-bold text-gray-900 mb-3">More from Karpithal</h3>
                    <div className="space-y-1">
                      <a href="#" className="flex items-center p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-gray-900 text-sm">Teach on Karpithal</span>
                      </a>
                      <a href="#" className="flex items-center p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-gray-900 text-sm">About us</span>
                      </a>
                      <a href="#" className="flex items-center p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-gray-900 text-sm">Karpithal Business</span>
                      </a>
                    </div>
                  </div>

                  {/* Auth Buttons */}
                  <div className="space-y-2.5 pt-4 border-t border-gray-100">
                    <Button
                      onClick={onSignInClick}
                      variant="outline"
                      className="w-full py-2.5 text-sm text-primary border-primary hover:bg-primary/5"
                    >
                      Log in
                    </Button>
                    <Button
                      onClick={onSignUpClick}
                      className="w-full py-2.5 text-sm bg-secondary hover:bg-secondary/90 text-white"
                    >
                      Sign up
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full py-2.5 text-sm text-gray-700 border-gray-300"
                    >
                      Plans & Pricing
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;