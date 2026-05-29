import { Link, useLocation } from "react-router-dom"
import logo from "../assets/images/logo.png"

const Header = () => {
  const location = useLocation()

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#2a66f5' : '#444',
    fontWeight: location.pathname === path ? '700' : '500',
    fontSize: '15px',
    padding: '6px 12px',
    borderRadius: '8px',
    background: location.pathname === path ? '#eff6ff' : 'transparent',
    transition: 'all 0.2s'
  })

  const authLinkStyle = (path, filled) => ({
    textDecoration: 'none',
    color: filled ? 'white' : '#2a66f5',
    fontWeight: '600',
    fontSize: '14px',
    padding: '8px 20px',
    borderRadius: '8px',
    background: filled ? '#2a66f5' : 'transparent',
    border: '2px solid #2a66f5',
    transition: 'all 0.2s'
  })

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 48px',
      background: 'white',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>

      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="logo" style={{ height: '60px' }} />
      </Link>

      {/* Nav */}
      <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link to="/" style={linkStyle('/')}>Home</Link>
        <Link to="/dashboard" style={linkStyle('/dashboard')}>Dashboard</Link>
      </nav>

      {/* Auth */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Link to="/login" style={authLinkStyle('/login', false)}>Iniciar sesión</Link>
        <Link to="/register" style={authLinkStyle('/register', true)}>Registrarse</Link>
      </div>

    </header>
  )
}

export default Header