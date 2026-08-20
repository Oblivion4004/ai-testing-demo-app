import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) e.password = 'Password must include uppercase, lowercase, and a number';
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 500));
      const ok = register(form.name, form.email, form.password);
      if (ok) {
        setSuccess('Account created successfully! Redirecting...');
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
    <div className="auth-page" data-testid="register-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 data-testid="register-title">Create Account</h1>
          <p>Join Lumiere and start shopping</p>
        </div>
        {success && <div className="auth-message success" data-testid="register-success">{success}</div>}
        <form className="auth-form" onSubmit={handleSubmit} data-testid="register-form" noValidate>
          <div className="form-group">
            <label htmlFor="register-name" className="form-label">Full Name</label>
            <input type="text" id="register-name" name="name" className={`form-input ${errors.name ? 'error' : ''}`} placeholder="John Doe" value={form.name} onChange={handleChange} data-testid="register-name-input" />
            {errors.name && <p className="form-error" data-testid="register-name-error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="register-email" className="form-label">Email Address</label>
            <input type="email" id="register-email" name="email" className={`form-input ${errors.email ? 'error' : ''}`} placeholder="you@example.com" value={form.email} onChange={handleChange} data-testid="register-email-input" />
            {errors.email && <p className="form-error" data-testid="register-email-error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="register-password" className="form-label">Password</label>
            <input type="password" id="register-password" name="password" className={`form-input ${errors.password ? 'error' : ''}`} placeholder="Create a strong password" value={form.password} onChange={handleChange} data-testid="register-password-input" />
            {errors.password && <p className="form-error" data-testid="register-password-error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="register-confirm-password" className="form-label">Confirm Password</label>
            <input type="password" id="register-confirm-password" name="confirmPassword" className={`form-input ${errors.confirmPassword ? 'error' : ''}`} placeholder="Repeat your password" value={form.confirmPassword} onChange={handleChange} data-testid="register-confirm-password-input" />
            {errors.confirmPassword && <p className="form-error" data-testid="register-confirm-password-error">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className="btn btn-primary btn-lg" disabled={loading} data-testid="register-submit-btn">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" data-testid="register-login-link">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;