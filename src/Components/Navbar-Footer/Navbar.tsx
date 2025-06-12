/**
 * Navbar component
 * 
 * - Main application navigation displayed at the top of the screen.
 * - Allows the user to navigate through stores and items.
 * - Includes a logout button and displays the current user's username.
 * - Navigation links use `NavLink` for active link highlighting.
 *
 * Props:
 * @prop {string} username – Displayed username in the top right corner
 */
import { NavLink, useNavigate } from 'react-router-dom';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username  }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/'); 
    location.reload(); 
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        {/*  */}
        <div className="nav-left">
          <NavLink
            to="/app/stores"
            className={({ isActive }) => (isActive ? 'button is-primary active' : 'button is-primary')}
          >
            <span>Stores</span>
          </NavLink>

          <NavLink
            to="/app/items"
            className={({ isActive }) => (isActive ? 'button is-primary active' : 'button is-primary')}
          >
            <span>Items</span>
          </NavLink>
          {/*  */}
          <button
            className="button is-primary"
            onClick={() => navigate('/app/stores?create=true')}
          >
            <span>Create Store</span>
          </button>
          <button
            className="button is-primary"
            onClick={() => navigate('/app/items?create=true')}
          >
            <span>Create Item</span>
          </button>
        </div>
        {/*  */}
        <div className="nav-right">
          <span className="username">{username}</span>
          <button onClick={handleLogout} className="button is-secondary">
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;