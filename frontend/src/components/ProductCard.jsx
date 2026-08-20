import { Link } from 'react-router-dom';
import StarRating from './StarRating';

function ProductCard({ product }) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="product-card fade-in" data-testid={`product-card-${product.id}`}>
      <Link to={`/products/${product.id}`}>
        <div className="product-card-image">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              const parent = e.target.parentElement;
              parent.style.background = 'linear-gradient(135deg, #e8e0d4, #d4c5b0)';
              parent.style.display = 'flex';
              parent.style.alignItems = 'center';
              parent.style.justifyContent = 'center';
              const text = document.createElement('span');
              text.textContent = product.name.split(' ')[0];
              text.style.cssText = "font-size: 1.5rem; font-weight: 700; color: #8b7355; font-family: 'Playfair Display', serif";
              parent.appendChild(text);
            }}
          />
          {hasDiscount && <span className="product-card-badge">Sale</span>}
        </div>
      </Link>
      <div className="product-card-body">
        <p className="product-card-category">{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="product-card-name" data-testid={`product-name-${product.id}`}>{product.name}</h3>
        </Link>
        <div className="product-card-rating">
          <StarRating rating={product.rating} />
          <span className="rating-count">({product.reviews})</span>
        </div>
        <div className="product-card-price">
          <span className="price-current" data-testid={`product-price-${product.id}`}>
            ${product.price.toFixed(2)}
          </span>
          {hasDiscount && <span className="price-original">${product.originalPrice.toFixed(2)}</span>}
        </div>
      </div>
      <div className="product-card-footer">
        <Link to={`/products/${product.id}`} className="btn btn-primary" data-testid={`view-product-${product.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;