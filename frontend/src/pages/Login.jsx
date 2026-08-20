import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login, authError } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 500));
      const ok = login(form.email, form.password);
      if (ok) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => navigate('/'), 1500);
      }
      setLoading(false);
    }
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="auth-page" data-testid="login-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 data-testid="login-title">Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>
        {success && <div className="auth-message success" data-testid="login-success">{success}</div>}
        {authError && <div className="auth-message error" data-testid="login-error">{authError}</div>}
        <form className="auth-form" onSubmit={handleSubmit} data-testid="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">Email Address</label>
            <input type="email" id="login-email" name="email" className={`form-input ${errors.email ? 'error' : ''}`} placeholder="you@example.com" value={form.email} onChange={handleChange} data-testid="login-email-input" />
            {errors.email && <p className="form-error" data-testid="login-email-error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="login-password" className="form-label">Password</label>
            <input type="password" id="login-password" name="password" className={`form-input ${errors.password ? 'error' : ''}`} placeholder="Enter your password" value={form.password} onChange={handleChange} data-testid="login-password-input" />
            {errors.password && <p className="form-error" data-testid="login-password-error">{errors.password}</p>}
          </div>
          <button type="submit" className="btn btn-primary btn-lg" disabled={loading} data-testid="login-submit-btn">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register" data-testid="login-register-link">Create one</Link></p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
            Demo: demo@lumiere.com / password123
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;