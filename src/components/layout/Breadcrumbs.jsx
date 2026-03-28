import { Link } from 'react-router-dom';
// import './Breadcrumbs.css';

const Breadcrumbs = ({ crumbs }) => {
  return (
    <nav className="breadcrumbs">
      {crumbs.map((crumb, index) => (
        <span key={index}>
          {index < crumbs.length - 1 ? (
            <Link to={crumb.path}>{crumb.label}</Link>
          ) : (
            <span>{crumb.label}</span>
          )}
          {index < crumbs.length - 1 && <span className="separator">/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;