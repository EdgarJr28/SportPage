import Imagen from "../Image/Image"

const ModalContainer = ({ children, className, onClose }) => {
  return <div className={`fixed justify-center flex items-center h-screen top-0 bottom-0 w-full bg-baseBlack/20 z-50 backdrop-blur-sm`}>
    <div className={`${className} bg-baseBlack p-5 m-5 pb-0 relative rounded`}>
      <button onClick={onClose} className="absolute right-3 top-3 "><Imagen path={"/svg/close.svg"} width={28} height={27} /></button>
      {children}
    </div>
  </div>
}

export default ModalContainer