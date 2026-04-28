import React from 'react';
import { motion } from 'framer-motion';
import {
  FiSearch, FiCode, FiZap, FiBookOpen,
  FiFilter, FiExternalLink,
} from 'react-icons/fi';

const features = [
  {
    icon: FiSearch,
    title: 'Smart Search',
    desc: 'Find algorithms instantly with real-time debounced search across names, descriptions, and tags.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: FiCode,
    title: 'Multi-language Code',
    desc: 'Every algorithm comes with clean implementations in Python, JavaScript, and C++ with syntax highlighting.',
    color: 'text-primary-400',
    bg: 'bg-primary-500/10',
    border: 'border-primary-500/20',
  },
  {
    icon: FiZap,
    title: 'Complexity Analysis',
    desc: 'Detailed Big-O time and space complexity with best, average, and worst case breakdowns.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  {
    icon: FiFilter,
    title: 'Advanced Filtering',
    desc: 'Filter by category (sorting, graph, DP…) and difficulty (easy, medium, hard) simultaneously.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  {
    icon: FiBookOpen,
    title: 'Rich Descriptions',
    desc: 'Understand not just the code but the intuition — prerequisites, use cases, and detailed explanations.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
  {
    icon: FiExternalLink,
    title: 'Live Visualizations',
    desc: 'One-click links to VisuAlgo and other interactive visualizers to see algorithms in action.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-dark-900/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Learn DSA</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            A comprehensive toolkit built for students, interview prep, and engineers who want to level up.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`card border ${feature.border} group hover:scale-[1.02] transition-all duration-300`}
            >
              <div className={`w-11 h-11 ${feature.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`${feature.color} text-xl`} />
              </div>
              <h3 className="text-gray-100 font-semibold mb-2 text-lg">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
