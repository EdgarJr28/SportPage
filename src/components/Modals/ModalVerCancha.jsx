import React, { useState } from 'react'
import ModalContainer from './ModalContainer'
import { convertTimestamp } from '../../utils/dateUtils';

const ModalVerCancha = ({ onClose, data }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const date = convertTimestamp(data.createdAt);

  const onCloseModal = () => {
    setModalStatus(!modalStatus);
    console.log("click")
  }

  return (
    <ModalContainer onClose={onClose}>
      <div className="bg-transparent w-80 p-4 rounded-xl">
        <div className="flex w-full justify-between items-center">
          <img className="w-1/2 h-1/2 object-cover" src={data.imagen_URL} alt="Cancha Central" />
          <div className="px-2 pb-4">
            <div className=" font-bold text-sm  text-white my-1">{data.nombre}</div>
            <p className="text-gray-300 text-xs">{data.descripcion}</p>
          </div>
        </div>
        <div className="px-2 pt-2 pb-2">
          <span className={`inline-flex ${data.disponibilidad ? 'bg-green-500' : 'bg-red-500'} rounded-full px-1 py-1 text-xs font-semibold text-white mr-2 mb-1`}>
            {data.disponibilidad ? "Disponible" : "No Disponible"}
          </span>
          <span className="inline-flex bg-gray-200 rounded-full px-1 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
            Capacidad: {data.capacidad}
          </span>
          <span className="inline-flex bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
            {date.toLocaleDateString()}
          </span>
          <div>
          </div>
          <p className="relative inline-flex w-full  text-baseGray text-xs mt-2 justify-items-end">
            <i className="fas fa-map-marker-alt my-auto"></i>
            &nbsp; {data.direccion}</p>
        </div>
      </div>
    </ModalContainer>
  )
}

export default ModalVerCancha
