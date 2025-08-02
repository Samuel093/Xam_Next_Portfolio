import React from "react";
import { skillsData } from "@/Data/data";
import SkillCard from "./SkillCard";
import { motion } from "framer-motion";
import SectionHeading from "@/app/SectionHeading";

const Skills = () => {
  return (
    <section id="skills" className="pt-16 pb-16  bg-gray-900">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{once: true}}
        className="mb-10"
      >
        <SectionHeading>Skills</SectionHeading>
      </motion.section>

      <div className="max-w-7xl mt-20 mx-auto px-6">
        <div
          className="mt-20 w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2
         md:grid-cols-3 lg-grid-cols-4 xl:grid-cols-5 gap-6  items-center"
        >
          {skillsData.map((skill, i) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                viewport={{once: true}}
                key={skill.id}
              >
                {/* {Skills Card} */}
                <SkillCard skill={skill} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
