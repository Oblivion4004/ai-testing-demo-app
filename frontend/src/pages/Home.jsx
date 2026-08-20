import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const getCount = (c) => (c === 'All' ? products.length : products.filter((p) => p.category === c).length);

  return (
    <div className="home-page">
      <section className="hero" data-testid="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-tagline">New Collection 2026</p>
            <h1 className="hero-title" data-testid="hero-title">
              Elevate Your<br />Everyday
            </h1>
            <p className="hero-description">
              Discover our curated collection of premium products designed for those who appreciate quality, craftsmanship, and timeless aesthetics.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-accent btn-lg" data-testid="hero-shop-now">
                Shop Collection
              </Link>
              <Link to="/products?category=Electronics" className="btn btn-outline btn-lg" data-testid="hero-explore" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>
                Explore
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="/images/hero.jpg"
              alt="Premium lifestyle"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.style.background = 'linear-gradient(135deg, #2a2a4a, #1a1a2e, #c9a96e)';
              }}
            />
          </div>
        </div>
      </section>

      <section className="section" data-testid="featured-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Curated Selection</p>
            <h2 className="section-title" data-testid="featured-title">Featured Products</h2>
            <p className="section-subtitle">Hand-picked items that define modern luxury and exceptional quality.</p>
          </div>
          <div className="product-grid" data-testid="featured-grid">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/products" className="btn btn-outline btn-lg" data-testid="view-all-products">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-light)' }} data-testid="categories-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Browse By</p>
            <h2 className="section-title" data-testid="categories-title">Shop by Category</h2>
            <p className="section-subtitle">Find exactly what you're looking for across our carefully organized collections.</p>
          </div>
          <div className="categories-grid" data-testid="categories-grid">
            {categories.filter((c) => c !== 'All').map((c) => (
              <Link key={c} to={`/products?category=${encodeURIComponent(c)}`} className="category-card" data-testid={`category-${c.replace(/\s+/g, '-').toLowerCase()}`}>
                <div className="category-card-bg"></div>
                <div className="category-card-overlay">
                  <h3 className="category-card-name">{c}</h3>
                  <p className="category-card-count">{getCount(c)} Products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="promo-section" data-testid="promo-section">
        <div className="promo-content">
          <div className="promo-text">
            <p className="section-label">Limited Offer</p>
            <h2>Summer Sale<br />Up to 30% Off</h2>
            <p>Discover incredible savings on our most popular items. Premium quality at unbeatable prices.</p>
            <Link to="/products" className="btn btn-primary btn-lg" data-testid="promo-shop-now">
              Shop the Sale
            </Link>
          </div>
          <div className="promo-image">
            <img
              src="/images/promo-1.jpg"
              alt="Sale"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.style.background = 'linear-gradient(135deg, #c9a96e, #8b7355)';
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;