import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = ({ username }: { username: string }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    location.reload(); // resetiraj stanje
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/stores" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Stores
        </NavLink>
        <NavLink to="/items" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Items
        </NavLink>
        <NavLink to="/create-store" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Create Store
        </NavLink>
        <NavLink to="/create-item" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Create Item
        </NavLink>
      </div>
      <div className="nav-right">
        <span className="username">{username}</span>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
