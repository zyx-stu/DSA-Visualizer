import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiCode, FiZap, FiLayers,
} from 'react-icons/fi';

const Hero = () => {
  const badges = ['Sorting', 'Graphs', 'Dynamic Programming', 'Trees', 'Searching'];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary-500/6 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm px-4 py-2 rounded-full mb-8"
          >
            <FiZap size={13} />
            Interactive Algorithm Learning Platform
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight"
          >
            Master{' '}
            <span className="gradient-text">Algorithms</span>
            <br />
            Visually
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Explore curated algorithm implementations in Python, JavaScript, and C++ — with complexity analysis, interactive visualizations, and clear explanations.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              to="/algorithms"
              className="btn-primary flex items-center justify-center gap-2 text-base"
              id="hero-explore-btn"
            >
              Explore Algorithms
              <FiArrowRight />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary flex items-center justify-center gap-2 text-base"
              id="hero-github-btn"
            >
              <FiCode />
              View on GitHub
            </a>
          </motion.div>

          {/* Category badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {badges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="badge bg-dark-800/80 text-gray-400 border border-dark-700 hover:border-primary-500/30 hover:text-primary-400 transition-all duration-200 cursor-default"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-4xl mx-auto"
        >
          {[
            {
              icon: FiCode,
              title: 'Multi-language Code',
              desc: 'Python, JavaScript, C++ implementations side by side.',
              color: 'text-blue-400',
              bg: 'bg-blue-500/10',
              border: 'border-blue-500/20',
            },
            {
              icon: FiZap,
              title: 'Complexity Analysis',
              desc: 'Time and space complexity for every algorithm.',
              color: 'text-primary-400',
              bg: 'bg-primary-500/10',
              border: 'border-primary-500/20',
            },
            {
              icon: FiLayers,
              title: 'Visual Learning',
              desc: 'Links to interactive visualizations on VisuAlgo.',
              color: 'text-green-400',
              bg: 'bg-green-500/10',
              border: 'border-green-500/20',
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`card border ${card.border} hover:scale-105 transition-transform duration-300`}
            >
              <div className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center mb-4`}>
                <card.icon className={`${card.color} text-lg`} />
              </div>
              <h3 className="text-gray-100 font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-500 text-sm">{card.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
