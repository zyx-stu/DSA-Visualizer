import React from 'react';

const COMPLEXITY_META = {
  'O(1)':         { label: 'Constant',     color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  'O(log n)':     { label: 'Logarithmic',  color: 'text-green-400',   bg: 'bg-green-500/10',   border: 'border-green-500/20' },
  'O(n)':         { label: 'Linear',       color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
  'O(n log n)':   { label: 'Linearithmic', color: 'text-yellow-400',  bg: 'bg-yellow-500/10',  border: 'border-yellow-500/20' },
  'O(n²)':        { label: 'Quadratic',    color: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/20' },
  'O(2^n)':       { label: 'Exponential',  color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20' },
};

const getMetaForComplexity = (str) => {
  for (const key of Object.keys(COMPLEXITY_META)) {
    if (str && str.includes(key.replace('O(', '').replace(')', ''))) {
      return COMPLEXITY_META[key];
    }
  }
  // Try exact match
  return COMPLEXITY_META[str] || { label: 'Unknown', color: 'text-gray-400', bg: 'bg-dark-700', border: 'border-dark-600' };
};

const ComplexityBadge = ({ label, value, showLabel = true }) => {
  const meta = getMetaForComplexity(value);

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${meta.bg} ${meta.border}`}>
      {showLabel && (
        <span className="text-gray-500 text-xs">{label}:</span>
      )}
      <code className={`text-sm font-mono font-semibold ${meta.color}`}>
        {value}
      </code>
      {meta.label && (
        <span className={`text-xs ${meta.color} opacity-70`}>({meta.label})</span>
      )}
    </div>
  );
};

export default ComplexityBadge;
