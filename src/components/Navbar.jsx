import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_BASE_URL, ENDPOINTS } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE_URL}${ENDPOINTS.posts}`)
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 6)))
      .catch((error) => console.error("Error cargando datos:", error));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <Header />

      <section className="dashboard-hero">
        <h1>Bienvenido a StudentsRepo</h1>
        <p>Tu repositorio de recursos estudiantiles</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por título, autor o materia"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>Buscar</button>
        </div>
      </section>

      <main className="main">
        <div className="dashboard-header">
          <button className="subir-btn">Subir Proyecto</button>
          <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
        </div>

        <div className="card-list">
          {filteredPosts.map((post) => (
            <article className="post-card" key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;