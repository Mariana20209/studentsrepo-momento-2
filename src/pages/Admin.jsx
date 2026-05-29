import { useState, useEffect } from "react"
import { end_points } from "../services/api"
import Swal from "sweetalert2"

function Admin() {
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState("Todos")

  useEffect(() => {
    cargarProyectos()
  }, [])

  const cargarProyectos = () => {
    fetch(end_points.projects)
      .then((res) => res.json())
      .then((data) => {
        setProyectos(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const cambiarEstado = (proyecto, nuevoEstado) => {
    fetch(`http://localhost:3002/proyectos/${proyecto.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...proyecto, estado: nuevoEstado })
    })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `Proyecto ${nuevoEstado}`,
          timer: 1500,
          showConfirmButton: false
        })
        cargarProyectos()
      })
      .catch(() => Swal.fire("Error", "No se pudo actualizar", "error"))
  }

  const filtrados = proyectos.filter(p =>
    filtro === "Todos" ? true : p.estado === filtro
  )

  const colorEstado = {
    Pendiente: { background: '#fff7ed', color: '#c2410c' },
    Aprobado: { background: '#f0fdf4', color: '#15803d' },
    Rechazado: { background: '#fef2f2', color: '#dc2626' },
  }

  const SkeletonCard = () => (
    <div style={{ background: 'white', borderRadius: '12px', padding: '20px' }}>
      <div style={{ height: '16px', background: '#e2e8f0', borderRadius: '4px', width: '70%', marginBottom: '12px' }}></div>
      <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '4px', width: '100%', marginBottom: '8px' }}></div>
    </div>
  )

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f1f1f', margin: '0 0 4px 0' }}>
          Administración de Proyectos
        </h1>
        <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
          Aprueba, rechaza o modifica los proyectos de los estudiantes
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['Todos', 'Pendiente', 'Aprobado', 'Rechazado'].map(estado => (
          <button
            key={estado}
            onClick={() => setFiltro(estado)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '13px',
              background: filtro === estado ? '#2a66f5' : 'white',
              color: filtro === estado ? 'white' : '#444',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
            }}
          >
            {estado}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : filtrados.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#999' }}>
            <p style={{ fontSize: '40px', margin: '0 0 12px 0' }}>📭</p>
            <p>No hay proyectos en este estado</p>
          </div>
        ) : (
          filtrados.map(proyecto => (
            <div key={proyecto.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderLeft: '4px solid #2a66f5'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#1f1f1f' }}>
                  {proyecto.titulo}
                </h3>
                <span style={{
                  ...colorEstado[proyecto.estado],
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  flexShrink: 0,
                  marginLeft: '8px'
                }}>
                  {proyecto.estado}
                </span>
              </div>

              <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#666' }}>{proyecto.descripcion}</p>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#999' }}>👤 {proyecto.estudiante}</p>
              <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#999' }}>📚 {proyecto.area}</p>

              <a
                href={proyecto.archivoUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '8px',
                  background: '#f8faff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  color: '#2a66f5',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '500',
                  marginBottom: '12px'
                }}
              >
                📄 Ver PDF
              </a>

              <div style={{ display: 'flex', gap: '8px' }}>
                {proyecto.estado === 'Pendiente' && (
                  <>
                    <button
                      onClick={() => cambiarEstado(proyecto, 'Aprobado')}
                      style={{
                        flex: 1, padding: '8px', border: 'none', borderRadius: '8px',
                        background: '#f0fdf4', color: '#15803d', fontWeight: '600',
                        fontSize: '12px', cursor: 'pointer'
                      }}
                    >
                      ✅ Aprobar
                    </button>
                    <button
                      onClick={() => cambiarEstado(proyecto, 'Rechazado')}
                      style={{
                        flex: 1, padding: '8px', border: 'none', borderRadius: '8px',
                        background: '#fef2f2', color: '#dc2626', fontWeight: '600',
                        fontSize: '12px', cursor: 'pointer'
                      }}
                    >
                      ❌ Rechazar
                    </button>
                  </>
                )}

                {proyecto.estado === 'Rechazado' && (
                  <>
                    <button
                      onClick={() => cambiarEstado(proyecto, 'Aprobado')}
                      style={{
                        flex: 1, padding: '8px', border: 'none', borderRadius: '8px',
                        background: '#f0fdf4', color: '#15803d', fontWeight: '600',
                        fontSize: '12px', cursor: 'pointer'
                      }}
                    >
                      ✅ Aprobar
                    </button>
                    <button
                      onClick={() => cambiarEstado(proyecto, 'Pendiente')}
                      style={{
                        flex: 1, padding: '8px', border: 'none', borderRadius: '8px',
                        background: '#eff6ff', color: '#2a66f5', fontWeight: '600',
                        fontSize: '12px', cursor: 'pointer'
                      }}
                    >
                      ✏️ Editar
                    </button>
                  </>
                )}

                {proyecto.estado === 'Aprobado' && (
                  <p style={{ textAlign: 'center', color: '#15803d', fontWeight: '600', fontSize: '13px', margin: 0, width: '100%' }}>
                    ✅ Proyecto aprobado
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Admin