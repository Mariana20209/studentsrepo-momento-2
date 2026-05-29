import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function Dashboard() {
  const user = localStorage.getItem('user')

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8faff' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard