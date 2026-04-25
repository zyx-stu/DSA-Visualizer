import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAlgorithm } from '../api/algorithms';
import './AlgorithmDetail.css';

const DIFF_COLOR = { Easy: '#22c55e', Medium: '#f59e0b', Hard: '#ef4444' };

export default function AlgorithmDetail() {
  const { id } = useParams();
  const [algo, setAlgo] = useState(null);

  useEffect(() => {
    fetchAlgorithm(id).then(setAlgo);
  }, [id]);

  if (!algo) return <p style={{ padding: '2rem' }}>Loading...</p>;

  const openVisualizer = () => {
    if (algo.visualizerUrl) window.open(algo.visualizerUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="detail-page">
      <Link to="/" className="back-btn">← Back</Link>

      <div className="detail-header">
        <span className="category-tag">{algo.category}</span>
        <h1>{algo.name}</h1>
        <span className="difficulty" style={{ color: DIFF_COLOR[algo.difficulty] }}>
          {algo.difficulty}
        </span>
      </div>

      <p className="description">{algo.description}</p>

      <div className="complexity-grid">
        <div className="complexity-card">
          <span className="label">Time Complexity</span>
          <span className="value">{algo.timeComplex}</span>
        </div>
        <div className="complexity-card">
          <span className="label">Space Complexity</span>
          <span className="value">{algo.spaceComplex}</span>
        </div>
      </div>

      <div className="tags">
        {algo.tags?.map(t => <span key={t} className="tag">#{t}</span>)}
      </div>

      {/* THE KEY BUTTON — opens external visualizer */}
      {algo.visualizerUrl && (
        <button className="visualize-btn" onClick={openVisualizer}>
          🎬 Watch Visualisation →
        </button>
      )}
    </div>
  );
}
