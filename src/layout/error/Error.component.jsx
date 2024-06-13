import React from 'react'

const Error = () => {
    return (
        <div className="bg-[url('/images/fondo.png')] bg-no-repeat bg-cover bg-center  min-h-screen flex items-center justify-center">
            <div className="relative max-w-lg bg-baseBlack p-4 backdrop-blur-sm  rounded-md bottom-24 md:bottom-18">
                <div className="flex-row items-center text-center justify-center mb-6 text-red-500">
                    <h2 className="text-3xl m-4 font-bold"> 🚧 Error 🚧</h2>
                    <h2 className="text-xl font-bold"> 404 not found</h2>
                </div>
                <p className="text-center text-white mb-2">¡Lo sentimos! La página que buscas no se encontró.</p>
                <p className="text-center text-white">Puede que hayas ingresado una URL incorrecta o que la página haya sido eliminada.</p>
            </div>
        </div>
    )
}

export default Error