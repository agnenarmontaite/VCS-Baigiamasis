import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toolRentalLogo from '../assets/rent-a-tool-logo.png';

function Header() {
  const { isLoggedIn, logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className='flex items-center justify-between lg:h-[100px] bg-white p-5' style={{ color: 'var(--default-text-color)', fontFamily: "'Lexend', sans-serif" }}>
        <Link to="/" className="logo flex items-center justify-center">
          <img src={toolRentalLogo} alt="tool-rental-logo" className="h-[90px] absolute left-0 lg:relative lg:h-[130px]" />
        </Link>
        <div className={`nav-links hidden lg:flex justify-center flex-grow`}>
          <Link to="/" className="py-[14px] px-[20px] text-center text-black hover:text-black border border-white hover:border-red-500 hover:rounded-[25px]">Home</Link>
          <Link to="/tools" className="py-[14px] px-[20px] text-center text-black hover:text-black border border-white hover:border-red-500 hover:rounded-[25px]">Tools</Link>
          <Link to="/categories" className="py-[14px] px-[20px] text-center text-black border border-white hover:text-black hover:border hover:border-red-500 hover:rounded-[25px]">Categories</Link>
          <Link to="/about" className="py-[14px] px-[20px] text-center text-black border border-white hover:text-black hover:border hover:border-red-500 hover:rounded-[25px]">About Us</Link>
          <Link to="/contact" className="py-[14px] px-[20px] text-center border border-white text-black hover:text-black hover:border hover:border-red-500 hover:rounded-[25px]">Contact</Link>
          {isLoggedIn && user?.role === 'admin' && 
            <Link to="/admin" className="py-[14px] px-[20px] text-center border border-white text-black hover:text-black hover:border hover:border-red-500 hover:rounded-[25px]">Admin</Link>
          }
        </div>
        <div className={`auth-links hidden lg:flex space-x-4`}>
          {isLoggedIn ? (
            <>
              <span className="py-[14px] px-[20px] text-center">Welcome, {user?.name}!</span>
              <button onClick={logout} className='flex items-center px-5 py-3 text-red-500 font-medium border border-white hover:border-red-500 hover:rounded-[25px]'>
                <i className="bi bi-box-arrow-right mr-1"></i>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className='flex items-center px-5 py-3 text-red-500 font-medium border border-white hover:border-red-500 hover:rounded-[25px]'>
                <i className="bi bi-person mr-1"></i>
                Login
              </Link>
              <Link to="/signup" className='flex items-center bg-red-500 text-white rounded-[25px] border border-red-500 hover:border-black ml-2 px-5 py-3 font-medium'>
                <i className="bi bi-person-add mr-1"></i>
                Register
              </Link>
            </>
          )}
        </div>

        <div className='lg:hidden'>
          <button onClick={toggleMenu} className='text-xl'>
            <i className={`bi ${menuOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-[999]">
          <div className="p-8 w-4/5 max-w-[400px] bg-white rounded-lg">
            <div className="flex justify-end items-center">
              <button onClick={toggleMenu} className="text-2xl">
                <i className="bi bi-x"></i>
              </button>
            </div>
            <div className="flex flex-col space-y-4 text-center">
              <Link to="/" onClick={toggleMenu}>Home</Link>
              <Link to="/tools" onClick={toggleMenu}>Tools</Link>
              <Link to="/categories" onClick={toggleMenu}>Categories</Link>
              <Link to="#about-us" onClick={toggleMenu}>About Us</Link>
              <Link to="#contact" onClick={toggleMenu}>Contact</Link>
              {isLoggedIn && user?.role === 'admin' && (
                <Link to="/admin" onClick={toggleMenu}>Admin</Link>
              )}
              {isLoggedIn ? (
                <>
                  <span>Welcome, {user?.name}!</span>
                  <button onClick={() => {
                    logout();
                    toggleMenu();
                  }} className="text-red-500">
                    <i className="bi bi-box-arrow-right mr-1"></i> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-red-500" onClick={toggleMenu}>
                    <i className="bi bi-person mr-1"></i> Login
                  </Link>
                  <Link to="/signup" className="text-red-500" onClick={toggleMenu}>
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
