import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="app">
      <Header />

      <section className="hero">
        <h1>Repositorio Estudiantil CESDE</h1>
        <p>Un espacio para compartir proyectos académicos, investigaciones y logros de los estudiantes.</p>
        <Link to="/login">
          <button className="hero-btn">Explorar proyectos</button>
        </Link>
      </section>

      <section className="areas">
        <h2 className="areas-titulo">Áreas Académicas</h2>
        <div className="areas-grid">
          <div className="area-card azul">
            <h3>💻 Desarrollo de Software</h3>
            <p>Proyectos de programación, apps y soluciones tecnológicas.</p>
          </div>
          <div className="area-card verde">
            <h3>🎨 Diseño Gráfico</h3>
            <p>Proyectos visuales, creatividad digital e identidad de marca.</p>
          </div>
          <div className="area-card rosado">
            <h3>👥 Talento Humano</h3>
            <p>Gestión, liderazgo y desarrollo organizacional.</p>
          </div>
        </div>
      </section>

      <section className="que-es">
        <h2>¿Qué es StudentsRepo?</h2>
        <p>StudentsRepo es una plataforma educativa donde los estudiantes del CESDE pueden compartir y consultar proyectos académicos de todas las áreas formativas.</p>
        <p><em>"El conocimiento se multiplica cuando se comparte."</em></p>
      </section>

      <Footer />
    </div>
  )
}

export default Home