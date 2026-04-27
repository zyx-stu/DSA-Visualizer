import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { algorithmAPI } from '../../services/api';
import { FiCode, FiLayers, FiTrendingUp } from 'react-icons/fi';

const Stats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await algorithmAPI.getStats();
        setStats(response.data.stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    {
      icon: FiCode,
      label: 'Algorithms',
      value: stats?.totalAlgorithms || 0,
      color: 'text-primary-500',
    },
    {
      icon: FiLayers,
      label: 'Categories',
      value: stats?.byCategory?.length || 0,
      color: 'text-green-500',
    },
    {
      icon: FiTrendingUp,
      label: 'Languages',
      value: 5,
      color: 'text-purple-500',
    },
  ];

  return (
    <section className="py-16 border-y border-dark-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-800 mb-4">
                <item.icon className={`text-2xl ${item.color}`} />
              </div>
              <div className="text-4xl font-bold mb-2">{item.value}+</div>
              <div className="text-gray-400">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
