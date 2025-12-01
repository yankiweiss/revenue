import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './Navbar.jsx'
import Fun_Facts from './Fun_Facts.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Fun_Facts />
     <Navbar />
    <App />
    
  </StrictMode>,
)
