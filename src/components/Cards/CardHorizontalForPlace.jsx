import Button from "../Buttons/Button"
import Imagen from "../Image/Image"


const CardHorizontalForPlace = ({ item, onClick, disabled }) => {
  return <div className='flex-row bg-baseBlack text-baseBlack justify-end mx-auto max-w-[320px] backdrop-blur-sm rounded-lg my-2'>
    {/**plave image */}
    <div className='flex w-full h-[200px]'>
      <Imagen path={`${item.imagen_URL}`} alt="place image" className="mx-auto rounded-lg object-cover w-full h-full " />
    </div>
    <div className="p-3 w-full">
      <div className="flex justify-between">
        <span className="inline-flex bg-gray-200 rounded-full px-1 py-1 text-xs font-semibold text-gray-700 mr-2 my-auto">
          Capacidad: {item.capacidad}
        </span>
        <span className={`inline-flex bg-${item.disponibilidad ? 'green' : 'red'}-500 rounded-full px-2 py-1 text-xs font-semibold text-white my-auto`}>
          {item.disponibilidad ? "Disponible" : "No Disponible"}
        </span>
      </div>
      <h4 className="font-semibold text-white text-xl mt-2">{item.nombre}</h4>
      <p className="relative inline-flex w-full  text-baseGray text-xs mt-1 justify-items-end">
        <i className="fas fa-map-marker-alt my-auto"></i>
        &nbsp;{item.direccion}</p>
      {/** caracteristicas y precio */}
      <div className="flex justify-center items-center border-t-2 border-gray-200">
        <Button disabled={disabled} onClick={onClick}  className="bg-transparent border border-white text-white text-sm  mt-2 hover:bg-baseBlack hover:text-green-500 hover:border-green-500 hover:scale-105 transition-all duration-300"> Reservar </Button>
      </div>
    </div>
  </div>
}

export default CardHorizontalForPlace