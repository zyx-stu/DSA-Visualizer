import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { algorithmAPI } from '../../services/api';
import { FiCode, FiEye, FiHeart, FiLayers } from 'react-icons/fi';

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!end) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <>{count.toLocaleString()}</>;
};

const Stats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    algorithmAPI.getStats()
      .then((res) => setStats(res.data?.overall))
      .catch(() => {/* silent fail */});
  }, []);

  const statItems = [
    {
      icon: FiCode,
      label: 'Algorithms',
      value: stats?.totalAlgorithms || 0,
      suffix: '+',
      color: 'text-primary-400',
      bg: 'bg-primary-500/10',
    },
    {
      icon: FiEye,
      label: 'Total Views',
      value: stats?.totalViews || 0,
      suffix: '+',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: FiHeart,
      label: 'Likes',
      value: stats?.totalLikes || 0,
      suffix: '+',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
    },
    {
      icon: FiLayers,
      label: 'Categories',
      value: 8,
      suffix: '',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Platform <span className="gradient-text">Statistics</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Continuously growing library of production-quality implementations.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card text-center group hover:border-primary-500/30 transition-all duration-300"
            >
              <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`${item.color} text-xl`} />
              </div>
              <div className="text-3xl font-extrabold text-gray-100 mb-1">
                <CountUp end={item.value} />
                {item.suffix}
              </div>
              <div className="text-gray-500 text-sm">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
