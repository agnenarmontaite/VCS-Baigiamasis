import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Įrankių nuoma</Link>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-blue-600">Pagrindinis</Link>
          <Link to="/tool/:id" className="hover:text-blue-600">Įrankiai</Link>
          <Link to="/admin" className="hover:text-blue-600">Valdymo Skydas</Link>
          <Link to="/login" className="hover:text-blue-600">Prisijungti</Link>
          <Link to="/signup" className="hover:text-blue-600">Registracija</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header