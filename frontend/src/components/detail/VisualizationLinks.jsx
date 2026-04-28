import React from 'react';
import { FiExternalLink, FiPlay } from 'react-icons/fi';

const PLATFORM_LABELS = {
  visualgo:              { label: 'VisuAlgo', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  'algorithm-visualizer':{ label: 'Algorithm Visualizer', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  youtube:               { label: 'YouTube', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  custom:                { label: 'Custom', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  other:                 { label: 'External', color: 'text-gray-400', bg: 'bg-dark-700', border: 'border-dark-600' },
};

const VisualizationLinks = ({ visualizations = [] }) => {
  if (!visualizations.length) {
    return (
      <p className="text-gray-600 text-sm">No visualization links available.</p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {visualizations.map((viz, i) => {
        const meta = PLATFORM_LABELS[viz.platform] || PLATFORM_LABELS.other;
        return (
          <a
            key={i}
            href={viz.url}
            target="_blank"
            rel="noreferrer"
            id={`viz-link-${viz.platform}-${i}`}
            className={`flex items-center justify-between p-4 rounded-xl border ${meta.bg} ${meta.border} hover:scale-[1.02] transition-all duration-200 group`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-dark-800 rounded-lg flex items-center justify-center shrink-0">
                <FiPlay className={`${meta.color} text-sm`} />
              </div>
              <div>
                <p className={`text-sm font-semibold ${meta.color}`}>{viz.title}</p>
                <p className="text-gray-600 text-xs mt-0.5">{meta.label}</p>
              </div>
            </div>
            <FiExternalLink className={`${meta.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
          </a>
        );
      })}
    </div>
  );
};

export default VisualizationLinks;
