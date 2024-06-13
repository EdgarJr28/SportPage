import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BurguerButton from './burguerButton/BurguerButton.component';
import { useCtx } from '../../context/context';
import AuthModalIndex from '../AuthModal/AuthModal';
import ModalContainer from '../../components/Modals/ModalContainer';

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const { authSession, setModalData, modalData, cerrarSesion, userSessionData } = useCtx();
  const [sessionOut, setSessionOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    if (active) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [active]);

  let navbarClasses = ['navbar'];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }

  const handleClick = () => {
    setActive(!active);
  };

  const handleLoginButton = () => {
    setModalData({ open: true, modalId: 'LOGIN' });
    setActive(false);
  };

  const handleSignupButton = () => {
    setModalData({ open: true, modalId: 'SIGNUP' });
    setActive(false);
  };

  const onCloseSessionOutModal = () => {
    setSessionOut(!sessionOut);
  };

  const singOut = async () => {
    try {
      console.log('sessionOut');
      const close = await cerrarSesion();
      if (close != null) throw new Error('Algo ha salido mal.');
      setActive(false);
      setSessionOut(true);
      navigate('/');
      setTimeout(() => {
        setSessionOut(false);
      }, 4000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      { /*** LOGIN AND SIGNUP POPUP */
        !authSession && modalData.open && (modalData.modalId === 'LOGIN' || modalData.modalId === 'SIGNUP') && <AuthModalIndex />
      }
      <div>
        <NavContainer className={`${navbarClasses.join(' ')} `}>
          <Link to="/"><h2>Sport</h2></Link>
          <div className={`links ${active ? 'active' : ''}`}>
            <Link to="/">Home</Link>
            {userSessionData && userSessionData.rol === 'user' && (
              <>
                <Link to="/reservar">Reservar</Link>
              </>
            )}
            {!authSession ? (
              <>
                <Link onClick={handleLoginButton}>Log In</Link>
                <Link onClick={handleSignupButton}>Sign Up</Link>
              </>
            ) : (
              <>
                {userSessionData && userSessionData.rol === 'admin' && <Link to="/admin">Admin</Link>}
                <Link onClick={singOut} className='mx-auto hover:text-red-200'>
                  <i className="relative fas fa-sign-out-alt my-auto"></i> Cerrar sesión
                </Link>
              </>
            )}
            <div className="flex flex-col md:flex-col md:items-start items-center z-999">
              <Link>
                <img
                  src="/svg/nike.svg"
                  alt="Nike Logo"
                  className="md:hidden w-10 mb-4 lg:blur-3xl hover:blur-0 transition-all duration-500 ease-in-out hover:scale-105 cursor-pointer"
                />
              </Link>
            </div>
          </div>
          <div className='burguer'>
            <BurguerButton active={active} handleClick={handleClick} />
          </div>
          <BgDiv className={active ? `active` : ''}></BgDiv>
        </NavContainer>
        {sessionOut && (
          <ModalContainer onClose={onCloseSessionOutModal} className={'bg-baseBlack w-[250px] h-[150px] shadow-gray-600'}>
            <div className="w-full h-full p-4 flex items-center justify-center">
              <h1 className='font-semibold text-base text-center text-white'>Has cerrado sesión.</h1>
            </div>
          </ModalContainer>
        )}
      </div>
    </>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  h2 {
    color: white;
    font-weight: 400;
    span {
      font-weight: bold;
    }
  }
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  padding: 1rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  transition: background-color 0.3s;
  a {
    color: white;
    text-decoration: none;
    margin-right: 1rem;
  }
  .links {
    position: absolute;
    top: -700px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .6s ease-in-out;
    a {
      color: white;
      font-size: 2rem;
      display: block;
    }
    @media(min-width: 768px) {
      position: initial;
      margin: 0;
      align-items: center;
      a {
        font-size: 1rem;
        color: white;
        display: inline;
      }
      display: flex;
    }
  }
  .links.active {
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 150px;
    left: 0;
    right: 0;
    text-align: center;
    a {
      font-size: 1.5rem;
      margin: 1rem;
      color: white;
      position: relative;
      z-index: 991;
    }
  }
  .burguer {
    @media(min-width: 768px) {
      display: none;
    }
  }
`;

const BgDiv = styled.div`
  position: absolute;
  top: -1200px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 990;
  transition: all .6s ease-in-out;

  &.active {
    backdrop-filter: blur(10px);
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.75) !important;
    border-radius: 0 0 10px 10px;
    top: 69px;
    left: 0;
    width: 100%;
    height: 500px;
  }

  &.active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit; /* Inherit the background properties from the parent */
    backdrop-filter: blur(1px); /* Aplica el desenfoque */
    z-index: -1; /* Asegura que el pseudo-elemento esté detrás del contenido */
    border-radius: inherit; /* Mantén los bordes redondeados */
  }
`;
