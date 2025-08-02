"use client"

import React from 'react'
import { projectData } from '@/Data/data'
import { PinContainer } from './ui/3d-pin'
import { motion } from 'framer-motion'
import SectionHeading from '@/app/SectionHeading'
import Image from 'next/image'

export default function Projects() {
  return (
    <section id='projects' className='py-20 relative overflow-hidden  bg-gray-900'>
      <div className='max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8'>
           {/* Section Heading */}
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{once:true}}
            className='mb-10'>
           <SectionHeading>My Projects</SectionHeading>
           </motion.div>
              
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 
            gap-10 relative z-10 items-center justify-center '>
            {projectData.map((project, i)=>{
                return <motion.div 
                  
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{
                                    y: -10,
                   transition: { duration: 0.2 }
               }}
                 key={project.id}  className='group relative sm:py-20 '>
                    <PinContainer>
                      <div className='relative flex items-center justify-center
                       sm:w-80 w-[60vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10'>
                        <div className='relative w-full h-full overflow-hidden lg:rounded-3xl #151030'
                         style={{ backgroundColor: "#151030" }}>
                           
                        </div>
                        <Image src={project.image} alt="img" width={400} height={200}
                         className='z-10 h-auto absolute mt-5 bg-contain'/>
                      </div>
                      <h1 className="font-bold text-white lg:text-xl md:text-xl text-base line-clamp-1">
                {project.title}
              </h1>

                   <p
                className="lg:text-xl lg:font-normal font-light text-[#BEC1DD] text-sm line-clamp-2">
                {project.desc}
              </p>

              <div className='flex items-center justify-between mt-5 mb-2'>
                <div className='flex flex-wrap items-center'>
                  {project.iconLists.map((icon, index)=>(
                    <div key={index} className='border border-white/[.2] rounded-full
                     `bg-tertiary lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center'
                       style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}>
                         <Image src={icon} alt="icon5" width={40} height={40} className="p-2"/>

                    </div>
                  ))}

                </div>

              </div>

                      
                    </PinContainer>
                    
                    
                </motion.div>
            })}

        </div>
        </div>
    </section>
  )
}

