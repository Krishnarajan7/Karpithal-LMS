"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BarChart2,
  Globe,
  Video,
  PlaneTakeoff,
  AudioLines,
} from "lucide-react";

// Debounce hook
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const allActions = [
  {
    id: "1",
    label: "React Development",
    icon: <BarChart2 className="h-4 w-4 text-blue-500" />,
    description: "Programming",
    short: "425 courses",
    end: "Category",
  },
  {
    id: "2",
    label: "UI/UX Design",
    icon: <PlaneTakeoff className="h-4 w-4 text-orange-500" />,
    description: "Design",
    short: "312 courses",
    end: "Category",
  },
  {
    id: "3",
    label: "Digital Marketing",
    icon: <Video className="h-4 w-4 text-purple-500" />,
    description: "Marketing",
    short: "298 courses",
    end: "Category",
  },
  {
    id: "4",
    label: "Data Science",
    icon: <AudioLines className="h-4 w-4 text-green-500" />,
    description: "Technology",
    short: "234 courses",
    end: "Category",
  },
  {
    id: "5",
    label: "Photography",
    icon: <Globe className="h-4 w-4 text-blue-500" />,
    description: "Creative",
    short: "156 courses",
    end: "Category",
  },
];

function ActionSearchBar({ actions = allActions }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 200);

  useEffect(() => {
    if (!isFocused) {
      setResult(null);
      return;
    }

    if (!debouncedQuery) {
      setResult({ actions: allActions });
      return;
    }

    const normalizedQuery = debouncedQuery.toLowerCase().trim();
    const filteredActions = allActions.filter((action) => {
      const searchableText = action.label.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });

    setResult({ actions: filteredActions });
  }, [debouncedQuery, isFocused]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsTyping(true);
    setHighlightedIndex(-1);
  };

  const handleFocus = () => {
    setSelectedAction(null);
    setIsFocused(true);
  };

  const handleKeyDown = (e) => {
    if (!result || !result.actions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < result.actions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : result.actions.length - 1
      );
    }

    if (e.key === "Enter" && highlightedIndex >= 0) {
      setSelectedAction(result.actions[highlightedIndex]);
      setIsFocused(false);
    }

    if (e.key === "Escape") {
      setIsFocused(false);
      setQuery("");
    }
  };

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.4 },
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="w-full flex justify-center relative">
      {/* centered wrapper with width animation */}
      <div
        className={`transition-all duration-300 ${
          isFocused ? "w-96" : "w-64"
        }`}
      >
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search courses..."
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-4 py-2 h-10 text-sm rounded-full focus-visible:ring-offset-0 border-gray-200 focus:border-primary transition-all duration-300 w-full"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        {/* Dropdown aligned with input */}
        <AnimatePresence>
          {isFocused && result && !selectedAction && (
            <motion.div
              className="absolute top-full left-0 w-full mt-2 border rounded-2xl shadow-xl overflow-hidden border-gray-200 bg-white z-50"
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div className="max-h-80 overflow-y-auto">
                <motion.ul>
                  {result.actions.map((action, index) => (
                    <motion.li
                      key={action.id}
                      className={`px-4 py-3 flex items-center justify-between cursor-pointer border-b border-gray-100 last:border-b-0
                        ${
                          highlightedIndex === index
                            ? "bg-gray-100"
                            : "hover:bg-gray-50"
                        }`}
                      variants={item}
                      layout
                      onClick={() => {
                        setSelectedAction(action);
                        setIsFocused(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          {action.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {action.label}
                          </div>
                          <div className="text-xs text-gray-500">
                            {action.description} • {action.short}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                        {action.end}
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Press Enter to select</span>
                  <span>ESC to close &nbsp;• &nbsp;↑↓ to navigate</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export { ActionSearchBar };
