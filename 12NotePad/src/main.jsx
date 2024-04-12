import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Preview from './Preview.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />  
  },
  {
    path: '/preview/:noteId',
    element: <Preview />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
