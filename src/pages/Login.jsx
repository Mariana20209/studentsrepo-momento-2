import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bgImage from "../assets/images/marca.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Campos vacíos",
        text: "Debes completar todos los campos",
      });
      return;
    }

    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
      registeredUser &&
      email === registeredUser.email &&
      password === registeredUser.password
    ) {
      const sessionUser = {
        name: registeredUser.name,
        email: registeredUser.email,
        isLogged: true,
      };

      localStorage.setItem("user", JSON.stringify(sessionUser));

      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: `Bienvenida, ${registeredUser.name}`,
      });

      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: "Credenciales inválidas",
        text: "Correo o contraseña incorrectos",
      });
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="main-centered" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="login-card">
          <h2 className="login-titulo">Acceder</h2>

        <form className="form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit" className="login-btn">Acceder</button> 
        </form>

        <p className="form-text">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;