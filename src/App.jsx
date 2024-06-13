import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Navbar from './layout/navbar/Navbar.component'
import { CtxProvider, useCtx } from './context/context'
import PanelAdmin from './layout/PanelAdmin/PanelAdmin'
import AuthIndex from './layout/AuthIndex/AuthIndex'
import ReservarIndex from './layout/Reservar/ReservarIndex'
import Home from './layout/home/Home'
import Footer from './layout/Footer/Footer.component'
import Error from './layout/error/Error.component'


function App() {
  const { authSession } = useCtx()

  const getUserDataFromLocalStorage = () => {
    const userDataString = localStorage.getItem("userData");
    return userDataString ? JSON.parse(userDataString) : null;
  };

  // Componente protegido que verifica el rol del usuario
  const AdminRoute = ({ element, ...rest }) => {
    const userData = getUserDataFromLocalStorage();
    return userData && userData.rol === "admin" ? element : <Navigate to="/login" />;
  };
  const UserRoute = ({ element, ...rest }) => {
    const userData = getUserDataFromLocalStorage();
    return userData && userData.rol === "user" ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <CtxProvider>
        <Router>
          <div className="bg-[url('/images/fondo.png')] md:bg-[url('/gifs/fondo.gif')] bg-no-repeat object-fill bg-cover bg-center min-h-screen w-full">
            <Navbar />
            <Routes>
              <Route path="*" element={<Error />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<> <Home /> <AuthIndex /> </>} />
              <Route path="/admin" element={<AdminRoute element={<PanelAdmin />} />} />
              <Route path="/reservar" element={<UserRoute element={<ReservarIndex />} />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </CtxProvider>

    </>
  )
}

export default App
