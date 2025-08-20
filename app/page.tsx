'use client'


import Clients from '@/app/clients/components/clients';
import Hero from '@/app/clients/components/hero';
import Projects from '@/app/clients/components/projects';
import Services from '@/app/clients/components/Services';
import Skills from '@/app/clients/components/Skills';
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
