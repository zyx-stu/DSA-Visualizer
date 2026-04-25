import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">⚡ DSA Visualizer</Link>
      <span className="tagline">Learn algorithms visually</span>
    </nav>
  );
}
