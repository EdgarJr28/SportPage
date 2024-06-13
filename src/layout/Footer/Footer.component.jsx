import React, { useState } from 'react'
import InputWithLabel from '../../components/Inputs/InputWithLabel';
import { useCtx } from '../../context/context';
import { Link } from 'react-router-dom';



const Footer = () => {
    const { authSession, setModalData, modalData, cerrarSesion, userSessionData } = useCtx()
    const [formData, setFormData] = useState({
        email: ''
    });


    const handleChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleLoginButton = () => {
        setModalData({ open: true, modalId: "LOGIN" })
        setActive(false)
    }
    const handleSignupButton = () => {
        setModalData({ open: true, modalId: "SIGNUP" })
        setActive(false)
    }

    return (
        <footer className="bg-black text-white pt-4 pb-1">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo and Social Media */}
                    <div className="flex flex-col md:flex-col md:items-start items-center">
                        <img
                            src="/svg/nike.svg"
                            alt="Nike Logo"
                            className="w-32 mb-4 lg:blur-3xl hover:blur-0 transition-all duration-500 ease-in-out hover:scale-105 cursor-pointer"
                        />
                        <div className="flex space-x-4">
                            <a target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook fa-2x hover:text-blue-500 hover:scale-105 transition duration-300"></i>
                            </a>
                            <a target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter fa-2x hover:text-blue-200 hover:scale-105 transition duration-300"></i>
                            </a>
                            <a target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram fa-2x rounded-full hover:bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-50 hover:scale-105 transition duration-100"></i>
                            </a>
                        </div>
                    </div>
                    {/* Navigation Links */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Enlaces Rápidos</h2>
                        <ul className="space-y-2">
                            <li><Link className='hover:text-green-500' to="/">Home</Link></li>
                            {!authSession && (<>
                                <li><span className="cursor-pointer hover:text-green-500" onClick={() => handleLoginButton()}>Log In</span></li>
                                <li><span className="cursor-pointer hover:text-green-500" onClick={() => handleSignupButton()}>Sign Up</span></li>
                            </>)}
                            {userSessionData && userSessionData.rol == 'user' && <>
                                <li> <Link to="/reservar">Reservar</Link></li>
                            </>
                            }
                            {userSessionData && userSessionData.rol == 'admin' && <><li><Link to="/admin">Admin</Link></li></>}

                        </ul>
                    </div>
                    {/* Newsletter Subscription */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Suscríbete al boletín</h2>
                        <form>
                            <InputWithLabel onChange={handleChange} type={"email"} name="email" placeholder={"Introduce tu correo"} label="E-mail" value={formData.email} className="w-full p-2 mb-4 text-white" />
                            <button
                                type="submit"
                                className="w-full bg-transparent text-white border border-white py-2 hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-white hover:text-black"
                            >
                                Suscribirse
                            </button>
                        </form>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <p className='text-xs'>&copy; 2024 Sport, Inc. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
