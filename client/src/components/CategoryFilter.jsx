export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="category-filter">
      {categories.map(cat => (
        <button
          key={cat}
          className={`filter-btn ${selected === cat ? 'active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat || 'All'}
        </button>
      ))}
    </div>
  );
}
