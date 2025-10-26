import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { SocketProvider } from './context/SocketContetx'

const App = () => {
  return (
    
 <div >
    <Navbar/>
      <main className="min-h-screen">
      <Outlet />  {/* All nested routes will render here */}
    </main>
    <Footer/>
   </div>
  
  )
}

export default App