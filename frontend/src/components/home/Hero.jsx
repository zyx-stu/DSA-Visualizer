import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-dark-950 to-dark-950" />
      
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master{' '}
              <span className="gradient-text">
                Algorithms
              </span>
              <br />
              Through Visualization
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Explore, learn, and visualize data structures and algorithms with
            interactive code examples in multiple programming languages.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/algorithms">
              <Button size="lg" className="group">
                Explore Algorithms
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="group">
              <FiPlay className="mr-2" />
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
