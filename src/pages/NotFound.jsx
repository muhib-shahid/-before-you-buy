import { Link } from 'react-router-dom';
// import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p><i className="fas fa-exclamation-triangle"></i> Page not found.</p>
      <Link to="/" className="btn-primary"><i className="fas fa-home"></i> Go Home</Link>
    </div>
  );
};

export default NotFound;