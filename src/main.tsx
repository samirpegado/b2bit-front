import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './context/UserAuth.tsx'
import { ToastContainer } from 'react-toastify';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <App />
        <ToastContainer 
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        
        />
      </UserProvider>
    </Router>    
  </React.StrictMode>,
)
