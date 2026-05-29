import { useState, useEffect } from "react"
import { end_points } from "../services/api"

function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("http://localhost:3002/usuarios")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.filter(u => u.role === 'estudiante'))
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const filtered = students.filter((s) =>
    s.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  )

  const SkeletonCard = () => (
    <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e2e8f0', flexShrink: 0 }}></div>
      <div style={{ flex: 1 }}>
        <div style={{ height: '14px', background: '#e2e8f0', borderRadius: '4px', width: '60%', marginBottom: '8px' }}></div>
        <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '4px', width: '80%' }}></div>
      </div>
    </div>
  )

  return (
    <div style={{ padding: '24px' }}>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f1f1f', margin: '0 0 4px 0' }}>
          👥 Estudiantes
        </h1>
        <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
          Listado de todos los estudiantes registrados
        </p>
      </div>

      {/* Buscador */}
      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="🔍 Buscar por nombre o correo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Lista */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
            <p style={{ fontSize: '40px', margin: '0 0 12px 0' }}>🔍</p>
            <p>No se encontraron estudiantes</p>
          </div>
        ) : (
          filtered.map((student) => (
            <div key={student.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '16px 20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              {/* Avatar */}
              <div style={{
                width: '48px', height: '48px',
                borderRadius: '50%',
                background: '#2a66f5',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {student.fullName?.split(" ").map((i) => i[0]).join("") || "S"}
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', color: '#1f1f1f', fontSize: '15px' }}>
                  {student.fullName}
                </p>
                <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>
                  {student.email}
                </p>
              </div>

              {/* Badge */}
              {student.status && (
                <span style={{
                  background: student.status === 'active' ? '#f0fdf4' : '#fff7ed',
                  color: student.status === 'active' ? '#15803d' : '#c2410c',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {student.status}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Students