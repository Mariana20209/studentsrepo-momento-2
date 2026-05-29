import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routerApp } from './routes/routerApp'
import './App.css'

const router = createBrowserRouter(routerApp)

function App() {
  return <RouterProvider router={router} />
}

export default App