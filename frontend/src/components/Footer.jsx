import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">Lumière</div>
          <p>Curating premium products for the modern connoisseur. Discover exceptional quality and timeless design.</p>
        </div>
        <div className="footer-column">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/products" data-testid="footer-all-products">All Products</Link></li>
            <li><Link to="/products?category=Electronics">Electronics</Link></li>
            <li><Link to="/products?category=Fashion">Fashion</Link></li>
            <li><Link to="/products?category=Home+%26+Living">Home & Living</Link></li>
            <li><Link to="/products?category=Accessories">Accessories</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/">Press</Link></li>
            <li><Link to="/">Blog</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><Link to="/">Help Center</Link></li>
            <li><Link to="/">Shipping</Link></li>
            <li><Link to="/">Returns</Link></li>
            <li><Link to="/">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Lumiere. All rights reserved.</p>
        <p>Designed with precision and care.</p>
      </div>
    </footer>
  );
}

export default Footer;