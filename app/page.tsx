'use client'


import Clients from '@/components/clients';
import Hero from '@/components/hero';
import Projects from '@/components/projects';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <main>
      <Hero />
      <Services/>
      <Skills/>
      <Projects/>
      <Clients/>
                 </main>
  );
}
