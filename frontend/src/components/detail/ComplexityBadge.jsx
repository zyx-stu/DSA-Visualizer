import React from 'react';

const ComplexityBadge = ({ difficulty }) => {
  const colors = {
    easy: 'bg-green-500/10 text-green-500 border-green-500/20',
    medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    hard: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <span className={`badge border ${colors[difficulty]}`}>
      {difficulty.toUpperCase()}
    </span>
  );
};

export default ComplexityBadge;
