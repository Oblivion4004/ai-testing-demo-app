import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function OrderConfirmation() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('lastOrder');
    if (stored) setOrder(JSON.parse(stored));
  }, []);

  if (!order) {
    return (
      <div className="order-confirmation" data-testid="order-confirmation-page">
        <div className="order-card">
          <h1>No Order Found</h1>
          <p className="order-message">You haven't placed an order yet.</p>
          <Link to="/products" className="btn btn-primary btn-lg" data-testid="confirmation-continue-shopping">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation" data-testid="order-confirmation-page">
      <div className="order-card fade-in">
        <div className="order-icon" data-testid="order-success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1 data-testid="order-confirmation-title">Order Confirmed!</h1>
        <p className="order-message" data-testid="order-confirmation-message">
          Thank you for your purchase, {order.customer.fullName}! We've sent a confirmation to {order.customer.email}.
        </p>
        <div className="order-number" data-testid="order-number">Order #{order.orderNumber}</div>
        <div className="order-summary-list" data-testid="order-summary-list">
          {order.items.map((item, i) => (
            <div className="order-summary-item" key={i} data-testid={`order-item-${i}`}>
              <span>{item.name} x{item.quantity}</span>
              <span>${item.total.toFixed(2)}</span>
            </div>
          ))}
          <div className="order-summary-item">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="order-summary-item">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="order-summary-item">
            <span>Tax</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          <div className="order-summary-item" data-testid="order-total">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', marginBottom: '2rem' }}>
          Order placed on {order.date}
        </p>
        <Link to="/products" className="btn btn-primary btn-lg" data-testid="confirmation-continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;