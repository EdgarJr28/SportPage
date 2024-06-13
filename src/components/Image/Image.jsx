// EjemploComponent.js
import React from 'react';
import { Img } from 'react-image';

const Imagen = ({ path, width, height, className }) => {
    return (
        <div>
            <Img
                src={path}
                className={`${className}`}
                loader={<img src={path} alt="Cargando..." />}
                unloader={<img src={path} alt="Imagen no disponible" />}
                width={width}
                height={height}
            />
        </div>
    );
};

export default Imagen;
