import { Book, Menu, Search, Palette, GraduationCap, History, Users, LayoutDashboard, Sparkles, Boxes } from "lucide-react";
import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Link } from "react-router-dom";


export default function Navbar({
  logo = {
    url: "/",
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png",
    alt: "Karpithal logo",
    title: "Karpithal",
  },

  menu = [
    { title: "Home", url: "/" },
    {
      title: "Explore",
      url: "#",
      items: [
        {
          title: "All Courses",
          description: "Browse our complete course catalog",
          icon: <Book className="size-5 shrink-0" />,
          url: "/courses",
        },
        {
          title: "Learning Paths",
          description: "Structured learning journeys for your goals",
          icon: <LayoutDashboard className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Certifications",
          description: "Earn recognized certificates",
          icon: <Sparkles className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Free Resources",
          description: "Access free learning materials",
          icon: <Palette className="size-5 shrink-0" />,
          url: "/resources",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Community",
          description: "Connect with fellow learners",
          icon: <Users className="size-5 shrink-0" />,
          url: "/community",
        },
        {
          title: "Blog",
          description: "Latest insights and learning tips",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Tutorials",
          description: "Step-by-step learning guides",
          icon: <GraduationCap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Help Center",
          description: "Get support when you need it",
          icon: <History className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Business",
      url: "/business",
    },
  ],

  mobileExtraLinks = [
    { name: "Courses", url: "/courses" },
    { name: "Resources", url: "/resources" },
    { name: "Community", url: "/community" },
    { name: "Teach", url: "/teach" },
  ],

  auth = {
    login: { text: "Sign in", url: "#" },
    signup: { text: "Sign Up", url: "#" },
  },
  onSignInClick,
  onSignUpClick,
}) {
  const [openSearch, setOpenSearch] = React.useState(false);

  return (
    <section className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navbar */}
        <nav className="hidden justify-between lg:flex h-16 items-center">
          <div className="flex items-center gap-6">
            <Link to={logo.url} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">{logo.title}</span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenSearch(true)}
            >
              <Search className="size-4" />
            </Button>

            {/* Auth Buttons */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onSignInClick}
            >
              {auth.login.text}
            </Button>
            <Button 
              size="sm"
              onClick={onSignUpClick}
              className="bg-secondary hover:bg-secondary/90 text-white"
            >
              {auth.signup.text}
            </Button>
          </div>
        </nav>

        {/* Mobile Navbar */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between h-16">
            <Link to={logo.url} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">{logo.title}</span>
            </Link>
            <div className="flex items-center gap-2">
              {/* Search button mobile */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenSearch(true)}
              >
                <Search className="size-4" />
              </Button>

              {/* Menu Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link to={logo.url} className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">{logo.title}</span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="my-6 flex flex-col gap-6">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>
                    <div className="border-t border-gray-200 py-4">
                      <div className="grid grid-cols-2 justify-start">
                        {mobileExtraLinks.map((link, idx) => (
                          <Link
                            key={idx}
                            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                            to={link.url}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button 
                        variant="outline"
                        onClick={onSignInClick}
                      >
                        {auth.login.text}
                      </Button>
                      <Button
                        onClick={onSignUpClick}
                        className="bg-secondary hover:bg-secondary/90 text-white"
                      >
                        {auth.signup.text}
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Search Popup */}
      <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
        <CommandInput placeholder="Search courses, topics..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="text-gray-500" heading="Suggestions">
            <CommandItem className="text-gray-800">Programming Courses</CommandItem>
            <CommandItem className="text-gray-800">Design Courses</CommandItem>
            <CommandItem className="text-gray-800">Business Training</CommandItem>
            <CommandItem className="text-gray-800">Teach on Karpithal</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </section>
  );
}

const renderMenuItem = (item) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-muted-foreground">
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3">
            <NavigationMenuLink>
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <Link
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                    to={subItem.url}
                  >
                    {subItem.icon}
                    <div>
                      <div className="text-sm font-semibold">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-muted-foreground">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <Link
      key={item.title}
      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
      to={item.url}
    >
      {item.title}
    </Link>
  );
};

const renderMobileMenuItem = (item) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
              to={subItem.url}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-muted-foreground">
                    {subItem.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} to={item.url} className="font-semibold">
      {item.title}
    </Link>
  );
};
