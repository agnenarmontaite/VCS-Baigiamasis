import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Header() {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <header className="container mx-auto px-4">
      <nav>
        <Link to="/" className="logo">
          Equipment Rental
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/tools">Tools</Link>
          <Link to="#categories">Categories</Link>
          <Link to="#about-us">About Us</Link>
          <Link to="#contact">Contact</Link>
          {isLoggedIn && user?.role === 'admin' && (
            <Link to="/admin">Admin</Link>
          )}
        </div>
        <div className="auth-links">
          {isLoggedIn ? (
            <>
              <span className="mr-2 text-xl">Welcome, {user?.name}!</span>
              <Link onClick={logout}>
                <i className="bi bi-box-arrow-right"></i> Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <i className="bi bi-person"></i> Login
              </Link>
              <Link to="/signup">
                <i className="bi bi-person-add"></i> Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
