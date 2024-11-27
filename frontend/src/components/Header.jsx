import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

function Header() {
  const { isLoggedIn, logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <nav className="flex items-center justify-between bg-white p-5">
        <Link to="/" className="logo text-2xl font-bold">
          Equipment Rental{' '}
        </Link>
        <div className={`nav-links hidden md:flex justify-center flex-grow space-x-6`}>
          <Link to="/">Home</Link>
          <Link to="/tools">Tools</Link>
          <Link to="#categories">Categories</Link>
          <Link to="#about-us">About Us</Link>
          <Link to="#contact">Contact</Link>
          {isLoggedIn && user?.role === 'admin' && <Link to="/admin">Admin</Link>}
        </div>
        <div className={`auth-links hidden md:flex space-x-4 items-center`}>
          {isLoggedIn ? (
            <>
              <span className="mr-2 text-xl">Welcome, {user?.name}!</span>
              <button onClick={logout} className="flex items-center logout-button">
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center">
                <i className="bi bi-person mr-1"></i> Login
              </Link>
              <Link to="/signup" className="flex items-center">
                <i className="bi bi-person-add mr-1"></i> Register
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl">
            <i className={`bi ${menuOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu flex justify-center items-center fixed">
          <div className="mobile-menu-inner bg-white rounded-lg">
            <div className="flex justify-end items-center">
              <button onClick={toggleMenu} className="text-2xl">
                <i className="bi bi-x"></i>
              </button>
            </div>
            <div className="flex flex-col space-y-4 text-center">
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/tools" onClick={toggleMenu}>
                Tools
              </Link>
              <Link to="#categories" onClick={toggleMenu}>
                Categories
              </Link>
              <Link to="#about-us" onClick={toggleMenu}>
                About Us
              </Link>
              <Link to="#contact" onClick={toggleMenu}>
                Contact
              </Link>
              {isLoggedIn && user?.role === 'admin' && (
                <Link to="/admin" onClick={toggleMenu}>
                  Admin
                </Link>
              )}
              {isLoggedIn ? (
                <>
                  <span>Welcome, {user?.name}!</span>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                  >
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={toggleMenu}>
                    <i className="bi bi-person mr-1"></i> Login
                  </Link>
                  <Link to="/signup" onClick={toggleMenu}>
                    <i className="bi bi-person-add mr-1"></i> Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
