import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, soloAdmin }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    return <Navigate to="/login" />
  }

  if (soloAdmin && user.role !== 'admin') {
    return <Navigate to="/dashboard/projects" />
  }

  return children
}

export default ProtectedRoute