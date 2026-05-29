import { Link, useLocation } from "react-router-dom"
import { getLocalStorage, removeLocalStorage } from "../helpers/local-storage"
import { redirectAlert } from "../helpers/alerts"
import logo from "../assets/images/logo.png"

const Sidebar = () => {
  const user = JSON.parse(getLocalStorage("user"))
  const location = useLocation()

  function logout() {
    removeLocalStorage("user")
    removeLocalStorage("token")
    redirectAlert("Cerrando sesión", "Serás redireccionado al login", "/login", "info")
  }

  const linkStyle = (path) => ({
    display: 'block',
    padding: '10px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '15px',
    backgroundColor: location.pathname.includes(path) ? '#2a66f5' : 'transparent',
    color: location.pathname.includes(path) ? 'white' : '#444',
    transition: 'all 0.2s'
  })

  return (
    <aside style={{
      width: '260px',
      minHeight: '100vh',
      background: '#f8faff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px'
    }}>

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <img src={logo} alt="logo" style={{ width: '120px' }} />
      </div>

      {/* Usuario */}
      <div style={{
        background: '#2a66f5',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{
          width: '48px', height: '48px',
          borderRadius: '50%',
          background: 'white',
          color: '#2a66f5',
          fontWeight: 'bold',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 10px auto'
        }}>
          {user?.fullName?.split(" ").map((i) => i[0]).join("") || "U"}
        </div>
        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>{user?.fullName || "Usuario"}</p>
        <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.85 }}>{user?.role || ""}</p>
      </div>

      {/* Navegación */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <Link to="/dashboard/projects" style={linkStyle('projects')}>
          📁 Proyectos
        </Link>
        <Link to="/dashboard/students" style={linkStyle('students')}>
          👥 Estudiantes
        </Link>
        {user?.role === 'admin' && (
          <Link to="/dashboard/admin" style={linkStyle('admin')}>
            ⚙️ Administración
          </Link>
        )}
      </nav>

      {/* Cerrar sesión */}
      <button
        onClick={logout}
        style={{
          padding: '12px',
          background: 'white',
          border: '2px solid #2a66f5',
          borderRadius: '8px',
          color: '#2a66f5',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '14px',
          marginTop: '16px'
        }}
      >
        Cerrar sesión
      </button>

    </aside>
  )
}

export default Sidebar