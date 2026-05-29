import { Navigate } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import Admin from "../pages/Admin"
import Projects from "../pages/Projects"
import Students from "../pages/Students"
import ProtectedRoute from "../pages/ProtectedRoute"

export const routerApp = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate to="projects" /> },
      { path: "projects", element: <Projects /> },
      { path: "students", element: <Students /> },
      {
        path: "admin",
        element: (
          <ProtectedRoute soloAdmin={true}>
            <Admin />
          </ProtectedRoute>
        )
      }
    ]
  }
]