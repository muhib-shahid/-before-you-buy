import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../services/authService';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
setError('');
setLoading(true);

const { error } = await signIn(email, password);

setLoading(false);

if (error) setError(error);
else navigate('/');

};

return ( <div className="auth-page"> <div className="auth-wrapper">

    {/* LEFT SIDE */}
    <div className="auth-left">
      <div className="auth-container">

        {/* HEADER */}
        <div style={{ marginBottom: "2.2rem", textAlign: "center" }}>
          <h2 style={{ marginBottom: "0.5rem" }}>Login</h2>
          <p style={{ opacity: 0.7, fontSize: "0.95rem" }}>
            Access your account
          </p>
        </div>

        {/* ERROR */}
        {error && <div className="error-message">{error}</div>}

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
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

          {/* PASSWORD */}
          <div className={`input-group ${password ? 'active' : ''}`}>
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>

        </form>

        {/* REDIRECT */}
        <p className="auth-redirect">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="auth-right">
      <div style={{ maxWidth: "320px" }}>
        <h1
          style={{
            fontSize: "2.6rem",
            marginBottom: "1rem",
            lineHeight: "1.2"
          }}
        >
          Welcome Back 👋
        </h1>

        <p
          style={{
            opacity: 0.85,
            fontSize: "1rem",
            lineHeight: "1.6"
          }}
        >
          Clean authentication experience with smooth interactions and
          modern UI proportions.
        </p>
      </div>
    </div>

  </div>
</div>

);
};

export default Login;
