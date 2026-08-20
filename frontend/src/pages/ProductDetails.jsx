import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const product = products.find((p) => p.id === parseInt(id));
  const related = products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <p style={{ marginTop: '1rem', color: 'var(--color-gray-500)' }}>The product you are looking for does not exist.</p>
        <Link to="/products" className="btn btn-primary btn-lg" style={{ marginTop: '2rem' }}>Browse Products</Link>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setMessage('Added to cart!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="product-detail" data-testid="product-detail-page">
      <div className="container">
        <div className="product-detail-grid">
          <div className="product-detail-image" data-testid="product-detail-image">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                e.target.style.display = 'none';
                const parent = e.target.parentElement;
                parent.style.background = 'linear-gradient(135deg, #e8e0d4, #d4c5b0)';
                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';
                const text = document.createElement('span');
                text.textContent = product.name.split(' ')[0];
                text.style.cssText = "font-size: 3rem; font-weight: 700; color: #8b7355; font-family: 'Playfair Display', serif";
                parent.appendChild(text);
              }}
            />
          </div>
          <div className="product-detail-info">
            <p className="product-detail-category">{product.category}</p>
            <h1 className="product-detail-name" data-testid="product-detail-name">{product.name}</h1>
            <div className="product-detail-rating">
              <StarRating rating={product.rating} />
              <span className="rating-count" data-testid="product-reviews">({product.reviews} reviews)</span>
            </div>
            <div className="product-detail-price">
              <span className="price-current" data-testid="product-detail-price">${product.price.toFixed(2)}</span>
              {hasDiscount && <span className="price-original">${product.originalPrice.toFixed(2)}</span>}
            </div>
            <p className="product-detail-description" data-testid="product-description">{product.description}</p>
            <div className="quantity-selector">
              <span className="quantity-label">Quantity:</span>
              <div className="quantity-controls">
                <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1} data-testid="quantity-decrease" aria-label="Decrease quantity">-</button>
                <input type="number" className="quantity-value" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} data-testid="quantity-input" min="1" aria-label="Quantity" />
                <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)} data-testid="quantity-increase" aria-label="Increase quantity">+</button>
              </div>
            </div>
            {message && <div className="auth-message success" data-testid="added-to-cart-message">{message}</div>}
            <div className="product-detail-actions">
              <button className="btn btn-accent btn-lg" onClick={handleAddToCart} data-testid="add-to-cart-btn">Add to Cart</button>
              <button className="btn btn-primary btn-lg" onClick={() => { addToCart(product, quantity); navigate('/cart'); }} data-testid="buy-now-btn">Buy Now</button>
            </div>
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-gray-200)' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>SKU: {product.sku}</p>
              <p style={{ fontSize: '0.875rem', color: product.inStock ? 'var(--color-success)' : 'var(--color-error)', marginTop: '0.5rem' }}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <section className="section" data-testid="related-products-section">
            <div className="section-header">
              <h2 className="section-title">Related Products</h2>
            </div>
            <div className="product-grid" data-testid="related-products-grid">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;