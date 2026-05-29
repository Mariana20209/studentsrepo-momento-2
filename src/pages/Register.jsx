import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import Header from "../components/Header"
import Footer from "../components/Footer"
import bgImage from "../assets/images/marca.png"

function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleRegister(event) {
    event.preventDefault()

    if (!name || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor completa toda la información",
      })
      return
    }

    const newUser = { name, email, password }
    localStorage.setItem("registeredUser", JSON.stringify(newUser))

    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "Tu cuenta fue creada correctamente",
    }).then(() => {
      navigate("/login")
    })
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
          <h2 className="login-titulo">Crear cuenta</h2>

          <form className="form" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-btn">
              Registrarse
            </button>
          </form>

          <p className="form-text">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Register