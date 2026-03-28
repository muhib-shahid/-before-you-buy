import { Link } from 'react-router-dom';
// import './Sidebar.css';

const Sidebar = ({ items }) => {
  return (
    <aside className="sidebar">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;