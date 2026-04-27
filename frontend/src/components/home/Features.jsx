import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCode, FiPlay, FiFilter } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: FiSearch,
      title: 'Smart Search',
      description: 'Find algorithms instantly with powerful search and filtering',
    },
    {
      icon: FiCode,
      title: 'Multi-Language',
      description: 'Code examples in Python, JavaScript, C++, Java, and Go',
    },
    {
      icon: FiPlay,
      title: 'Interactive Visualizations',
      description: 'See algorithms in action with step-by-step animations',
    },
    {
      icon: FiFilter,
      title: 'Difficulty Levels',
      description: 'Filter by Easy, Medium, or Hard difficulty levels',
    },
  ];

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Learn DSA</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive learning platform with all the tools you need to master
            data structures and algorithms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary-600/10 mb-4">
                <feature.icon className="text-2xl text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
