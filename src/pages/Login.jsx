import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { end_points } from "../services/api"
import { redirectAlert } from "../helpers/alerts"
import { saveLocalStorage } from "../helpers/local-storage"
import { generateToken } from "../helpers/generators"
import Header from "../components/Header"
import Footer from "../components/Footer"
import bgImage from "../assets/images/marca.png";

function Login() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [users, setUsers] = useState([])

  function getUsers() {
    fetch(end_points.users)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err))
  }

  useEffect(() => { getUsers() }, [])

  function findUser() {
    return users.find(
      (item) => user === item.username && password === item.password
    )
  }

  function signIn(e) {
    e.preventDefault()
    if (!user || !password)
      return redirectAlert("Campos vacíos", "Completa usuario y contraseña", "/login", "warning")
    if (findUser()) {
      saveLocalStorage("token", generateToken())
      saveLocalStorage("user", findUser())
      return redirectAlert("Bienvenido", "Serás redireccionado al dashboard", "/dashboard", "success")
    }
    return redirectAlert("Error", "Usuario o contraseña incorrectos", "/login", "error")
  }

  return (
    <div className="app">
      <Header />

      <main className="form-login-container" style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        flex: 1
      }}>
        <div className="login-card">
          <h2 className="login-titulo">Iniciar sesión</h2>
          <form className="form" onSubmit={signIn}>
            <input
              type="text"
              placeholder="Usuario"
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-btn">Acceder</button>
          </form>
          <p className="form-text">
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login