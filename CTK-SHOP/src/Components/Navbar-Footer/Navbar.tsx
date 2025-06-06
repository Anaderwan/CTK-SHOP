import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.scss';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // vrati na login
    location.reload(); // resetira stanje aplikacije
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-left">
          <NavLink
            to="/app/stores"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span>Stores</span>
          </NavLink>

          <NavLink
            to="/app/items"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span>Items</span>
          </NavLink>

          <NavLink
            to="/app/create-store"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span>Create Store</span>
          </NavLink>

          <NavLink
            to="/app/create-item"
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
