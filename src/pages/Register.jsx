import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signUp(email, password, username);
    setLoading(false);
    if (error) setError(error);
    else navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        {/* LEFT SIDE - FORM */}
        <div className="auth-left">
          <div className="auth-container">
            <div style={{ marginBottom: "2.2rem", textAlign: "center" }}>
              <h2 style={{ marginBottom: "0.5rem" }}>Register</h2>
              <p style={{ opacity: 0.7, fontSize: "0.95rem" }}>
                Create your account
              </p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className={`input-group ${username ? 'active' : ''}`}>
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>

              <div className={`input-group ${email ? 'active' : ''}`}>
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className={`input-group ${password ? 'active' : ''}`}>
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`btn-primary ${loading ? 'loading' : ''}`}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <p className="auth-redirect">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - BRANDING */}
        <div className="auth-right">
          <div style={{ maxWidth: "320px" }}>
            <h1 style={{ fontSize: "2.6rem", marginBottom: "1rem", lineHeight: "1.2" }}>
              Join Us 🎮
            </h1>
            <p style={{ opacity: 0.85, fontSize: "1rem", lineHeight: "1.6" }}>
              Create an account to write guides, participate in forums, and track your favorite games.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;