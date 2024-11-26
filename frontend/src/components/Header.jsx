import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
        <nav>
          <Link to="/" className="logo">Equipment Rental </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/tools">Tools</Link>
            <Link to="#categories">Categories</Link>
            <Link to="#about-us">About Us</Link>
            <Link to="#contact">Contact</Link>
          </div>
          <div className="auth-links">
            <Link to="/login"><i className="bi bi-person"></i>
              Login</Link>
            <Link to="/register"><i className="bi bi-person-add"></i>
              Register</Link>
          </div>
        </nav>
      </header>
  )
}

export default Header
