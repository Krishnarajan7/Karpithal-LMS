import React, { useState, useEffect } from "react";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Code,
  Palette,
  TrendingUp,
  Megaphone,
  Camera,
  Database,
  User,
  BookOpen,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionSearchBar } from "@/components/ui/action-search-bar";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ onSignInClick, onSignUpClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showSearchExpand, setShowSearchExpand] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  const categories = [
    { name: "Programming", icon: Code, courses: 425 },
    { name: "Design", icon: Palette, courses: 312 },
    { name: "Marketing", icon: Megaphone, courses: 298 },
    { name: "Finance", icon: TrendingUp, courses: 186 },
    { name: "Photography", icon: Camera, courses: 156 },
    { name: "Data Science", icon: Database, courses: 234 },
  ];

  const exploreGoals = [
    { name: "Learn Programming", icon: Code, desc: "Master coding skills" },
    { name: "Start a Career", icon: TrendingUp, desc: "Launch your future" },
    { name: "Get Certified", icon: Award, desc: "Earn credentials" },
    { name: "Build Projects", icon: BookOpen, desc: "Practice skills" },
  ];

  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
    open: {
      x: "0%",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body overflow for mobile modals
  useEffect(() => {
    const overflow =
      isMobileMenuOpen || showMobileSearch ? "overflow-hidden" : "";
    document.body.classList.toggle("overflow-hidden", !!overflow);
  }, [isMobileMenuOpen, showMobileSearch]);

  // Reset on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileMenuOpen(false);
      setShowMobileSearch(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add scrolled bg
  useEffect(() => {
    document.body.classList.toggle("scrolled", isScrolled);
  }, [isScrolled]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 mr-4 flex-shrink-0"
            // animate={{ x: showSearchExpand && !isMobileMenuOpen ? -80 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Karpithal</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() =>
                  setShowCategoriesDropdown(!showCategoriesDropdown)
                }
                className="flex items-center text-gray-700 hover:text-primary font-medium transition-colors duration-200"
              >
                Categories
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {showCategoriesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-[60] py-4">
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
                            <div className="font-medium text-gray-900 text-sm">
                              {category.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {category.courses} courses
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <a
              href="#"
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            >
              Teach
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            >
              Business
            </a>
          </div>

          {/* Search & Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.div
              className="relative flex-1 max-w-lg"
              animate={{
                flexGrow: showSearchExpand && !isMobileMenuOpen ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ActionSearchBar
                onFocusChange={(focused) => setShowSearchExpand(focused)}
              />
            </motion.div>

            <motion.div
              className="flex items-center space-x-4 ml-4 flex-shrink-0"
              // animate={{ x: showSearchExpand && !isMobileMenuOpen ? 80 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Button
                variant="ghost"
                onClick={onSignInClick}
                className="text-gray-700 hover:text-primary"
              >
                Sign In
              </Button>
              <Button
                onClick={onSignUpClick}
                className="bg-secondary hover:bg-secondary/90 text-white px-6"
              >
                Sign Up
              </Button>
            </motion.div>
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
              <Menu className="w-5 h-5" />
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
              className="md:hidden fixed inset-0 bg-black/50 z-[70]"
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
                  <h3 className="text-lg font-semibold text-gray-900">
                    Search Courses
                  </h3>
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
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-black/70 z-[80]"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <motion.div
                key="mobile-sidebar"
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="md:hidden fixed left-0 top-0 bottom-0 w-80 h-screen bg-white z-[90] overflow-y-auto"
              >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <span className="text-lg font-bold text-gray-900">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* User Greeting */}
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Welcome!</p>
                      <p className="text-sm text-gray-600">
                        Sign in to continue
                      </p>
                    </div>
                  </div>

                  {/* Explore Goals */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Explore by Goal
                    </h3>
                    <div className="space-y-2">
                      {exploreGoals.map((goal) => {
                        const IconComponent = goal.icon;
                        return (
                          <a
                            key={goal.name}
                            href="#"
                            className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {goal.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {goal.desc}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Most Popular Categories */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Most popular
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <a
                            key={category.name}
                            href="#"
                            className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">
                                {category.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {category.courses} courses
                              </div>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400 transform -rotate-90" />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* More from Karpithal */}
                  <div className="border-t border-gray-100 pt-6 space-y-2">
                    <a
                      href="#"
                      className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">
                        Teach on Karpithal
                      </span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">
                        About us
                      </span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">
                        Karpithal Business
                      </span>
                    </a>
                  </div>

                  {/* Auth Buttons */}
                  <div className="space-y-3 pt-6 border-t border-gray-100">
                    <Button
                      onClick={onSignInClick}
                      variant="outline"
                      className="w-full py-3 text-primary border-primary hover:bg-primary/5"
                    >
                      Log in
                    </Button>
                    <Button
                      onClick={onSignUpClick}
                      className="w-full py-3 bg-secondary hover:bg-secondary/90 text-white"
                    >
                      Sign up
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full py-3 text-gray-700 border-gray-300"
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
