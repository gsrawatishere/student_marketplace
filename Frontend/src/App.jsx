import React from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'

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