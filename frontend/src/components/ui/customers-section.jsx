import React from "react"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { AnimatedGroup } from "@/components/ui/animated-group"

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" ,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

export function CustomersSection({ customers = [], className }) {
  return (
    <section className={`bg-background pb-16 pt-16 md:pb-32 ${className ?? ""}`}>
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Trusted by &nbsp; 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                100+ Companies
              </span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Join thousands of learners from leading organizations worldwide
        </p>
      </div>
      <div className="group relative m-auto max-w-5xl px-6">
        <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
          <Link
            to="/"
            className="block text-sm duration-150 hover:opacity-75"
          >
            <span>Meet Our Customers</span>
            <ChevronRight className="ml-1 inline-block size-3" />
          </Link>
        </div>
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.75,
                },
              },
            },
            ...transitionVariants,
          }}
          className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14"
        >
          {customers.map((logo, index) => (
            <div key={index} className="flex">
              <img
                className="mx-auto h-auto w-fit dark:invert"
                src={logo.src}
                alt={logo.alt}
                height={logo.height}
                width="auto"
              />
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  )
}
