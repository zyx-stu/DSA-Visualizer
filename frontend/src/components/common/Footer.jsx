import React from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiGithub, FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t border-dark-800 bg-dark-950 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <FiZap className="text-white text-xs" />
              </div>
              <span className="font-bold gradient-text">DSA Visualizer</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              An interactive platform to explore, learn, and master data structures and algorithms with beautiful visualizations.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-gray-300 font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/algorithms', label: 'All Algorithms' },
                { to: '/algorithms?category=sorting', label: 'Sorting' },
                { to: '/algorithms?category=graph', label: 'Graph Algorithms' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-gray-500 hover:text-primary-400 text-sm transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-300 font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              {[
                { href: 'https://visualgo.net', label: 'VisuAlgo' },
                { href: 'https://algorithm-visualizer.org', label: 'Algorithm Visualizer' },
                { href: 'https://leetcode.com', label: 'LeetCode' },
                { href: 'https://github.com', label: 'GitHub' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500 hover:text-primary-400 text-sm transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} DSA Visualizer. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-gray-300 transition-colors"
            >
              <FiGithub size={18} />
            </a>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              Made with <FiHeart className="text-red-500 mx-1" size={13} /> for developers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
