import React from 'react'
import { convertTimestamp } from '../../utils/dateUtils';

const ItemsCard = ({ item, onEdit, onDelete, onShow }) => {
    const date = convertTimestamp(item.createdAt);
    return (
        <div className='p-2'>
            <div className="max-w-sm p-2 rounded-lg overflow-hidden shadow-white w-full h-full bg-baseBlack">
                <img className="w-full h-28 object-cover" src={item.imagen_URL} alt={item.nombre} />
                <div className="px-5 pb-4 h-28">
                    <div className="font-bold text-lg text-center text-white m-4">{item.nombre}</div>
                    <p className="text-baseGray text-sm">{item.descripcion}</p>
                </div>
                <div className="px-5 pt-2 pb-2">
                    <span className={`inline-flex bg-${item.disponibilidad ? 'green' : 'red'}-500 rounded-full px-2 py-1 text-xs font-semibold text-white mr-2 mb-1`}>
                        {item.disponibilidad ? "Disponible" : "No Disponible"}
                    </span>
                    <span className="inline-flex bg-gray-200 rounded-full px-1 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                        Capacidad: {item.capacidad}
                    </span>
                    <span className="inline-flex bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                        {date.toLocaleDateString()}
                    </span>
                    <p className="relative inline-flex w-full  text-baseGray text-xs mt-2 justify-items-end">
                        <i className="fas fa-map-marker-alt my-auto"></i>
                        &nbsp;{item.direccion}</p>
                </div>
                <div className="p-2 m-2 flex space-x-5 justify-end border-t border-gray-200">
                    <button onClick={onShow} className="text-blue-500 hover:text-blue-700 hover:scale-150 transform transition-transform duration-300 ease-in-out">
                        <i className="fas fa-eye"></i>
                    </button>
                    <button onClick={onEdit} className="text-green-500 hover:text-green-700 hover:scale-150 transform transition-transform duration-300 ease-in-out">
                        <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={onDelete} className="text-red-500 hover:text-red-700 hover:scale-150 transform transition-transform duration-300 ease-in-out">
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ItemsCard
