import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page" data-testid="cart-page">
        <div className="container">
          <div className="cart-empty" data-testid="cart-empty">
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any items yet.</p>
            <Link to="/products" className="btn btn-primary btn-lg" data-testid="cart-continue-shopping">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page" data-testid="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1 data-testid="cart-title">Shopping Cart</h1>
          <p style={{ color: 'var(--color-gray-500)', marginTop: '0.5rem' }}>
            {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <div className="cart-layout">
          <div className="cart-items" data-testid="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id} data-testid={`cart-item-${item.id}`}>
                <div className="cart-item-image">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const parent = e.target.parentElement;
                      parent.style.background = 'linear-gradient(135deg, #e8e0d4, #d4c5b0)';
                      parent.style.display = 'flex';
                      parent.style.alignItems = 'center';
                      parent.style.justifyContent = 'center';
                      const text = document.createElement('span');
                      text.textContent = item.name.split(' ')[0];
                      text.style.cssText = "font-size: 1rem; font-weight: 700; color: #8b7355";
                      parent.appendChild(text);
                    }}
                  />
                </div>
                <div className="cart-item-details">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="cart-item-name" data-testid={`cart-item-name-${item.id}`}>{item.name}</h3>
                  </Link>
                  <p className="cart-item-category">{item.category}</p>
                  <div className="cart-item-actions">
                    <div className="cart-item-quantity">
                      <div className="quantity-controls">
                        <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)} data-testid={`cart-decrease-${item.id}`} aria-label="Decrease">-</button>
                        <input type="number" className="quantity-value" value={item.quantity} onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))} min="1" data-testid={`cart-quantity-${item.id}`} aria-label="Quantity" />
                        <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)} data-testid={`cart-increase-${item.id}`} aria-label="Increase">+</button>
                      </div>
                    </div>
                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)} data-testid={`cart-remove-${item.id}`}>Remove</button>
                  </div>
                </div>
                <div className="cart-item-price">
                  <span className="price-current" data-testid={`cart-item-price-${item.id}`}>${(item.price * item.quantity).toFixed(2)}</span>
                  {item.quantity > 1 && <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', marginTop: '0.25rem' }}>${item.price.toFixed(2)} each</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary" data-testid="cart-summary">
            <h3>Order Summary</h3>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span data-testid="cart-subtotal">${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span data-testid="cart-shipping">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="cart-summary-row">
              <span>Tax (8%)</span>
              <span data-testid="cart-tax">${tax.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row total">
              <span>Total</span>
              <span data-testid="cart-total">${total.toFixed(2)}</span>
            </div>
            <div className="cart-summary-actions">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/checkout')} data-testid="cart-checkout-btn">
                Proceed to Checkout
              </button>
              <Link to="/products" className="btn btn-ghost" data-testid="cart-continue-shopping-link">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;