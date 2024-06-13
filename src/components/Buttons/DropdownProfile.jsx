import { useEffect } from "react"
import { useCtx } from "../../context/context"

export default function ProfileDropdown({ onClick, rol }) {
    // Determinar el valor del margen superior según el rol del usuario
    const mt = rol === 'admin' ? 'mt-[310px]' : 'mt-[250px]';
 
    // Renderizar el componente con el margen superior adecuado
    return (
        <div className="relative  z-[992]">
            {/* Menú desplegable */}
            <div
                className={`absolute ${mt} w-full mx-auto md:top-[60px] sm:mt-[250px] mdsm:right-1 mdsm:mt-2 py-2 mdsm:w-48 bg-transparent shadow-white mdsm:bg-baseBlack rounded-md mdsm:shadow-lg transition-all`}
            >
                {/* Agrega aquí los elementos del menú desplegable */}
                <a className="relative focus:text-black text-white inline-flex w-full justify-center py-2 text-sm text-center hover:bg-gray-100 hover:text-black cursor-pointer">
                    <i className="relative far fa-id-card my-auto"></i> &nbsp; Mi perfil
                </a>
                <a onClick={onClick} className="relative text-white inline-flex w-full justify-center py-2 text-sm text-center hover:bg-gray-100 hover:text-black cursor-pointer">
                    <i className="relative fas fa-sign-out-alt my-auto"></i> &nbsp; Cerrar sesión
                </a>
            </div>
        </div>

    )
}

