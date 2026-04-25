import { Link } from 'react-router-dom';
import './AlgorithmCard.css';

const DIFF_COLOR = { Easy: '#22c55e', Medium: '#f59e0b', Hard: '#ef4444' };

export default function AlgorithmCard({ algo }) {
  return (
    <Link to={`/algorithm/${algo._id}`} className="algo-card">
      <div className="card-header">
        <span className="card-category">{algo.category}</span>
        <span className="card-diff" style={{ color: DIFF_COLOR[algo.difficulty] }}>
          {algo.difficulty}
        </span>
      </div>
      <h3 className="card-name">{algo.name}</h3>
      <p className="card-desc">{algo.description.slice(0, 80)}...</p>
      <div className="card-footer">
        <span>⏱ {algo.timeComplex}</span>
        <span className="view-link">View →</span>
      </div>
    </Link>
  );
}
