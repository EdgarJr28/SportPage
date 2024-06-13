import React from "react";

const Sidebar = ({ children }) => {
    return (
        <div className="flex h-screen bg-baseBlack text-white">
            <div className="w-[20%] bg-baseBlack">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold">Dashboard</h2>
                    <ul className="mt-6">
                        <li>
                            <a href="#" className="block py-2 text-sm px-4 text-gray-400 hover:bg-gray-700 hover:text-white">
                                Gestionar Canchas
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-4 text-sm text-gray-400 hover:bg-gray-700 hover:text-white">
                                Perfil
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-4 text-sm text-gray-400 hover:bg-gray-700 hover:text-white">
                                Configuración
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

export default Sidebar;
