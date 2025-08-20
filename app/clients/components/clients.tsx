'use client';

import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/Data/data";
import SectionHeading from "@/app/SectionHeading";
import { InfiniteMovingCards } from "./ui/InfiniteCards";
import SafeHydrate from "./safeHydrate";

const Clients = () => {
  return (
    <section id="testimonial" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-10"
        >
          <SectionHeading>Peoples Opinion</SectionHeading>
        </motion.div>

        <div className="flex flex-col items-center max-lg:mt-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6 }}
            className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden"
          >
            <SafeHydrate>
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
              />
            </SafeHydrate>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Clients;

