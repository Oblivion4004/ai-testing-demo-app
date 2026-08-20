import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '', paymentMethod: 'credit-card' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page" data-testid="checkout-page">
        <div className="container">
          <div className="cart-empty" style={{ padding: '4rem 0' }}>
            <h3>Your cart is empty</h3>
            <p>Add items before checking out.</p>
            <Link to="/products" className="btn btn-primary btn-lg" style={{ marginTop: '1.5rem' }}>Browse Products</Link>
          </div>
        </div>
      </div>
    );
  }

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[\d\s\-+()]{7,}$/.test(form.phone)) e.phone = 'Please enter a valid phone number';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.state.trim()) e.state = 'State is required';
    if (!form.zipCode.trim()) e.zipCode = 'ZIP/Postal code is required';
    else if (!/^[A-Za-z0-9\s-]{3,10}$/.test(form.zipCode)) e.zipCode = 'Please enter a valid ZIP/Postal code';
    return e;
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      const order = {
        orderNumber: 'LUM-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
        items: cartItems.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price, total: i.price * i.quantity })),
        subtotal, shipping, tax, total, customer: form,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      sessionStorage.setItem('lastOrder', JSON.stringify(order));
      clearCart();
      navigate('/order-confirmation');
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page" data-testid="checkout-page">
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }} data-testid="checkout-title">Checkout</h1>
        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={handleSubmit} data-testid="checkout-form" noValidate>
            <h2>Contact Information</h2>
            <div className="form-group">
              <label htmlFor="checkout-fullName" className="form-label">Full Name *</label>
              <input type="text" id="checkout-fullName" name="fullName" className={`form-input ${errors.fullName ? 'error' : ''}`} placeholder="John Doe" value={form.fullName} onChange={handleChange} data-testid="checkout-fullname-input" />
              {errors.fullName && <p className="form-error" data-testid="checkout-fullname-error">{errors.fullName}</p>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="checkout-email" className="form-label">Email *</label>
                <input type="email" id="checkout-email" name="email" className={`form-input ${errors.email ? 'error' : ''}`} placeholder="you@example.com" value={form.email} onChange={handleChange} data-testid="checkout-email-input" />
                {errors.email && <p className="form-error" data-testid="checkout-email-error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="checkout-phone" className="form-label">Phone *</label>
                <input type="tel" id="checkout-phone" name="phone" className={`form-input ${errors.phone ? 'error' : ''}`} placeholder="+1 (555) 123-4567" value={form.phone} onChange={handleChange} data-testid="checkout-phone-input" />
                {errors.phone && <p className="form-error" data-testid="checkout-phone-error">{errors.phone}</p>}
              </div>
            </div>
            <h3>Shipping Address</h3>
            <div className="form-group">
              <label htmlFor="checkout-address" className="form-label">Street Address *</label>
              <input type="text" id="checkout-address" name="address" className={`form-input ${errors.address ? 'error' : ''}`} placeholder="123 Main Street" value={form.address} onChange={handleChange} data-testid="checkout-address-input" />
              {errors.address && <p className="form-error" data-testid="checkout-address-error">{errors.address}</p>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="checkout-city" className="form-label">City *</label>
                <input type="text" id="checkout-city" name="city" className={`form-input ${errors.city ? 'error' : ''}`} placeholder="New York" value={form.city} onChange={handleChange} data-testid="checkout-city-input" />
                {errors.city && <p className="form-error" data-testid="checkout-city-error">{errors.city}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="checkout-state" className="form-label">State *</label>
                <input type="text" id="checkout-state" name="state" className={`form-input ${errors.state ? 'error' : ''}`} placeholder="NY" value={form.state} onChange={handleChange} data-testid="checkout-state-input" />
                {errors.state && <p className="form-error" data-testid="checkout-state-error">{errors.state}</p>}
              </div>
            </div>
            <div className="form-group" style={{ maxWidth: '200px' }}>
              <label htmlFor="checkout-zipCode" className="form-label">ZIP / Postal Code *</label>
              <input type="text" id="checkout-zipCode" name="zipCode" className={`form-input ${errors.zipCode ? 'error' : ''}`} placeholder="10001" value={form.zipCode} onChange={handleChange} data-testid="checkout-zipcode-input" />
              {errors.zipCode && <p className="form-error" data-testid="checkout-zipcode-error">{errors.zipCode}</p>}
            </div>
            <h3>Payment Method</h3>
            <div className="payment-methods" data-testid="payment-methods">
              <label className={`payment-method ${form.paymentMethod === 'credit-card' ? 'selected' : ''}`}>
                <input type="radio" name="paymentMethod" value="credit-card" checked={form.paymentMethod === 'credit-card'} onChange={handleChange} data-testid="payment-credit-card" />
                <span className="payment-method-label">Credit / Debit Card</span>
              </label>
              <label className={`payment-method ${form.paymentMethod === 'paypal' ? 'selected' : ''}`}>
                <input type="radio" name="paymentMethod" value="paypal" checked={form.paymentMethod === 'paypal'} onChange={handleChange} data-testid="payment-paypal" />
                <span className="payment-method-label">PayPal</span>
              </label>
              <label className={`payment-method ${form.paymentMethod === 'bank-transfer' ? 'selected' : ''}`}>
                <input type="radio" name="paymentMethod" value="bank-transfer" checked={form.paymentMethod === 'bank-transfer'} onChange={handleChange} data-testid="payment-bank" />
                <span className="payment-method-label">Bank Transfer</span>
              </label>
            </div>
            <button type="submit" className="btn btn-accent btn-lg" style={{ width: '100%', marginTop: '2rem' }} disabled={loading} data-testid="checkout-submit-btn">
              {loading ? 'Processing Order...' : `Place Order - $${total.toFixed(2)}`}
            </button>
          </form>
          <div className="cart-summary" style={{ position: 'sticky', top: 'calc(var(--navbar-height) + 2rem)' }}>
            <h3>Order Summary</h3>
            {cartItems.map((i) => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', fontSize: '0.875rem', borderBottom: '1px solid var(--color-gray-200)' }}>
                <span style={{ color: 'var(--color-gray-600)' }}>{i.name} x{i.quantity}</span>
                <span>${(i.price * i.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="cart-summary-row" style={{ marginTop: '1rem' }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="cart-summary-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;