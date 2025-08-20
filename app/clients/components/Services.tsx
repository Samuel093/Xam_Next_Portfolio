import React from "react";
import { servicesData } from "@/Data/data";
import ServiceCard from "./ServiceCard";
import SectionHeading from "@/app/SectionHeading";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <div id="services" className="pt-16 pb-16  bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{once: true}}
        className="mb-10"
      >
        <SectionHeading>Services</SectionHeading>
      </motion.div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2
         lg:grid-cols-3 xl:grid-cols-4 gap-10 w-[80%] mx-auto items-center mt-20"
      >
        {servicesData.map((service, i) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{once: true}}
              key={service.id}
            >
              {/* {Services Card} */}
              <ServiceCard service={service} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
