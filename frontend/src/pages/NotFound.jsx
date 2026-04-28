import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950">
      <div className="text-center max-w-lg px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-8xl mb-6 select-none">404</div>
          <h1 className="text-3xl font-bold text-gray-100 mb-4">Page Not Found</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="btn-secondary flex items-center gap-2"
            >
              <FiArrowLeft size={14} />
              Go Back
            </button>
            <Link to="/" className="btn-primary flex items-center gap-2">
              <FiHome size={14} />
              Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
