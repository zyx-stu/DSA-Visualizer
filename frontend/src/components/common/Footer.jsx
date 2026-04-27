import React from 'react';
import { FiGithub, FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t border-dark-800 bg-dark-900/50">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Made with</span>
            <FiHeart className="text-red-500" />
            <span>for learning</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/yourusername/dsa-visualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FiGithub size={20} />
            </a>
          </div>

          <p className="text-gray-400 text-sm">
            © 2024 DSA Visualizer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
