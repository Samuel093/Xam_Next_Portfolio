"use client";
import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

// define the type of Props
type Props = {
  service: {
    id: number;
    title: string;
    description: string;
    icon: string;
  };
};

const ServiceCard = ({ service }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Tilt className="shadow-2xl p-6 rounded-lg  bg-zinc-800">
        <img src={service.icon} alt={service.title} width={40} height={40} />
        <div className="mt-4 text-lg font-bold text-gray-100">
          {service.title}
        </div>
        <p className="mt-3 text-sm text-white text-opacity-80">
          {service.description}
        </p>
      </Tilt>
    </motion.div>
  );
};

export default ServiceCard;
