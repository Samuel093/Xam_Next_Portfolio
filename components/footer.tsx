'use client';

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { GithubIcon, LinkedInIcon } from "./social-icons";
import Link from "next/link";

const socialLinks = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/areo-samuel-13924a214",
  twitter: "https://x.com/premium_uiux?t=1Iik2_pF5mhKH0A1HU9g6g&s=09",
  email: "mailto:areo.samuel@example.com", // ideally use mailto here
};

export default function Footer() {
  return (
    <footer id="footer" className="bg-blue__gradient border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <p className="text-gray-400">
              Building digital experiences that combine modern technology with exceptional design.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <ul className="flex space-x-4">
              <li>
                <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="text-gray-400 h-6 w-6 hover:text-white transition-colors" />
                </Link>
              </li>
              <li>
                <Link href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon className="text-gray-400 h-6 w-6 hover:text-white transition-colors" />
                </Link>
              </li>
              <li>
                <Link href={socialLinks.email} target="_blank" rel="noopener noreferrer">
                  <EnvelopeIcon className="text-gray-400 h-6 w-6 hover:text-white transition-colors" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Xamdev A. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
