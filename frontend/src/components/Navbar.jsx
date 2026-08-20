import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} data-testid="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo" data-testid="navbar-logo">
            Lumière
          </Link>
          <div className="navbar-links">
            <Link to="/" className={`navbar-link ${isActive('/')}`} data-testid="nav-home">Home</Link>
            <Link to="/products" className={`navbar-link ${isActive('/products')}`} data-testid="nav-products">Products</Link>
            <Link to="/login" className={`navbar-link ${isActive('/login')}`} data-testid="nav-login">Login</Link>
            <Link to="/register" className={`navbar-link ${isActive('/register')}`} data-testid="nav-register">Register</Link>
          </div>
          <div className="navbar-actions">
            <Link to="/cart" className="navbar-cart" data-testid="nav-cart" aria-label="Shopping cart">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {getCartCount() > 0 && <span className="cart-badge" data-testid="cart-badge">{getCartCount()}</span>}
            </Link>
            <button className="navbar-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle mobile menu" data-testid="mobile-menu-toggle">
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} data-testid="mobile-menu">
        <Link to="/" className="mobile-menu-link">Home</Link>
        <Link to="/products" className="mobile-menu-link">Products</Link>
        <Link to="/login" className="mobile-menu-link">Login</Link>
        <Link to="/register" className="mobile-menu-link">Register</Link>
        <Link to="/cart" className="mobile-menu-link">Cart</Link>
      </div>
    </>
  );
}

export default Navbar;