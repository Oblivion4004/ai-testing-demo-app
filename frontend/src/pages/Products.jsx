import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    const c = searchParams.get('category');
    if (c) setCategory(decodeURIComponent(c));
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== 'All') result = result.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [search, category, sort]);

  return (
    <div className="products-page" data-testid="products-page">
      <div className="container">
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <h1 className="section-title" data-testid="products-title">Our Products</h1>
          <p className="section-subtitle">Explore our complete collection of premium products</p>
        </div>
        <div className="products-toolbar" data-testid="products-toolbar">
          <div className="search-bar">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" className="search-input" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} data-testid="search-input" aria-label="Search products" />
          </div>
          <div className="filter-group">
            <select className="filter-select" value={category} onChange={(e) => { setCategory(e.target.value); setSearchParams({}); }} data-testid="category-filter" aria-label="Filter by category">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select className="filter-select" value={sort} onChange={(e) => setSort(e.target.value)} data-testid="sort-select" aria-label="Sort products">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
        <p className="results-count" data-testid="results-count">
          Showing {filtered.length} of {products.length} products
        </p>
        {filtered.length > 0 ? (
          <div className="product-grid" data-testid="product-grid">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="no-results" data-testid="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;