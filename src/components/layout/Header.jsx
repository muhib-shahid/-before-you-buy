import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { signOut } from '../../services/authService';
import NotificationBell from '../notifications/NotificationBell';

const Header = () => {
  const { user, isAdmin } = useAuth();
  const { unreadCount } = useNotifications();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">BeforeYouBuy</Link>
      </div>

      <nav className="nav">
        <ul>
          <li className="dropdown">
            <Link to="/games">
              Games <i className="fas fa-chevron-down"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/games">All Games</Link></li>
              <li><Link to="/games?filter=coming-soon">Coming Soon</Link></li>
              <li><Link to="/games?sort=rating">Top Rated</Link></li>
              <li><Link to="/deals">Deals & Discounts</Link></li>
              <li><Link to="/compare">Compare Games</Link></li>
              <li><Link to="/hardware-profiles">Can I Run It?</Link></li>
            </ul>
          </li>

          <li className="dropdown">
            <Link to="/community">
              Community <i className="fas fa-chevron-down"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/community">Forums</Link></li>
              <li><Link to="/guides">Game Guides</Link></li>
              <li><Link to="/reviews">User Reviews</Link></li>
              <li><Link to="/activity">Activity Feed</Link></li>
              <li><Link to="/streams">Live Streams</Link></li>
              {user && (
                <>
                  <li><Link to="/guides/new">Write a Guide</Link></li>
                  <li><Link to="/community/new">Start a Discussion</Link></li>
                </>
              )}
            </ul>
          </li>

          <li className="dropdown">
            <Link to="/news">
              News <i className="fas fa-chevron-down"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/news">Latest News</Link></li>
              <li><Link to="/news?category=patches">Patch Notes</Link></li>
              <li><Link to="/calendar">Release Calendar</Link></li>
            </ul>
          </li>

          <li><Link to="/deals">Deals</Link></li>

          {isAdmin && <li><Link to="/admin"><i className="fas fa-crown"></i> Admin</Link></li>}
        </ul>
      </nav>

      <div className="user-actions">
        {user ? (
          <>
            <NotificationBell />
            <div className="user-menu">
              <Link to="/profile"><i className="fas fa-user-circle"></i> {user.email}</Link>
              <button onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link>
            <Link to="/register"><i className="fas fa-user-plus"></i> Register</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;