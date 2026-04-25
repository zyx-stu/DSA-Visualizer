import { useEffect, useState } from 'react';
import { fetchAlgorithms, fetchCategories } from '../api/algorithms';
import AlgorithmCard from '../components/AlgorithmCard';
import CategoryFilter from '../components/CategoryFilter';
import './Home.css';

export default function Home() {
  const [algorithms, setAlgorithms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected]     = useState('');
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchAlgorithms(selected)
      .then(setAlgorithms)
      .finally(() => setLoading(false));
  }, [selected]);

  const filtered = algorithms.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="home">
      <h1>DSA Algorithm Library</h1>
      <p className="subtitle">Click any algorithm to see how it works — visualised.</p>

      <input
        className="search-bar"
        placeholder="Search algorithms..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <CategoryFilter
        categories={['', ...categories]}
        selected={selected}
        onChange={setSelected}
      />

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="card-grid">
          {filtered.map(algo => (
            <AlgorithmCard key={algo._id} algo={algo} />
          ))}
        </div>
      )}
    </main>
  );
}
