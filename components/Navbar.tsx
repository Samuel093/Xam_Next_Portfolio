'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import MenuItem from './menu-items';
import { LinkedInIcon } from './social-icons';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import { useUI } from '@/hooks/context/UIContext';

const navItems = [
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Services', id: 'services' },
  { label: 'Testimonial', id: 'testimonial' },
  { label: 'Contact', id: 'contact' },
  { label: 'Footer', id: 'footer' },
];

const socialLinks = {
  whatsapp: "https://wa.link/d2syw4",
  linkedin: "https://linkedin.com/in/areo-samuel-13924a214",
  twitter: "https://x.com/premium_uiux?t=1Iik2_pF5mhKH0A1HU9g6g&s=09",
  email: "mailto:areo.samuel@example.com", // Ideally use mailto
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { openContactPopup } = useUI();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleScroll = (id: string) => {
    if (id === 'contact') {
      openContactPopup();
      setIsMenuOpen(false);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 ${
        isScrolled
          ? 'backdrop-blur-2xl bg-background/90 shadow-2xl shadow-primary/10'
          : 'backdrop-blur-lg bg-background/50'
      } transition-all duration-300 ease-out`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 group">
              <div className="relative h-8 w-8 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-tertiary animate-spin-slow [mask-image:linear-gradient(transparent,white)]" />
                <div className="absolute inset-[2px] bg-background rounded-full flex items-center justify-center">
                  <span className="font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
                    XD
                  </span>
                </div>
              </div>
              <span className="font-semibold text-content/90 group-hover:text-primary transition-colors">
                Xamdev&trade;
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6 bg-background/80 px-4 py-2 rounded-full border border-white/5 shadow-lg shadow-primary/5">
              {navItems.map((item, i) => (
                <button key={item.label} onClick={() => handleScroll(item.id)}>
                  <MenuItem index={i} href={`#${item.id}`}>
                    {item.label}
                  </MenuItem>
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-white/10 mx-2" />

            <div className="flex gap-3">
              <Link
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 transition-colors group"
              >
                <FaWhatsapp className="h-5 w-5 text-content/80 group-hover:text-primary transition-colors" />
              </Link>
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 transition-colors group"
              >
                <LinkedInIcon className="h-5 w-5 text-content/80 group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-primary/10 transition-colors"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-content/80" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-content/80" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 space-y-4"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScroll(item.id)}
                className="block w-full text-left px-4 py-2 text-content/80 hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-white/5 flex gap-4 px-4">
              <Link
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 transition-colors group"
              >
                <FaWhatsapp className="h-5 w-5 text-content/80 group-hover:text-primary transition-colors" />
              </Link>
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 transition-colors group"
              >
                <LinkedInIcon className="h-5 w-5 text-content/80 group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
