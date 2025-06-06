import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = ({ username }: { username: string }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-left">
          <NavLink
            to="/stores"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span>Stores</span>
          </NavLink>
          <NavLink
            to="/items"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span>Items</span>
          </NavLink>
          <NavLink
            to="/create-store"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span>Create Store</span>
          </NavLink>
          <NavLink
            to="/create-item"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span>Create Item</span>
          </NavLink>
        </div>

        <div className="nav-right">
          <span className="username">{username}</span>
          <button onClick={handleLogout} className="logout-button">
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
