import React, { useState } from 'react'
import ModalContainer from './ModalContainer';
import InputWithLabel from '../Inputs/InputWithLabel';
import Button from '../Buttons/Button';
import PopUp from '../PopUps/PopUp';
import { Canchas } from '../../functions/canchas.service';
import InputWhithToggleSwitch from '../Inputs/InputWhithToggleSwitch';

const ModalNuevaCancha = ({ onClose }) => {
    const canchaServices = new Canchas();
    const [error, setError] = useState(null);
    const [PopUpStatus, setPopUpStatus] = useState()
    const [propsPopUp, setPropsPopUp] = useState({
        status: false,
        message: ''
    })
    const [canchaForm, setCanchaForm] = useState({
        nombre: '',
        descripcion: '',
        tipo: '',
        capacidad: '',
        direccion: '',
        imagen_URL: '',
        disponibilidad: false
    })


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let canchaData = {
                nombre: canchaForm.nombre,
                descripcion: canchaForm.descripcion,
                tipo: canchaForm.tipo,
                capacidad: canchaForm.capacidad,
                direccion: canchaForm.direccion,
                imagen_URL: canchaForm.imagen_URL,
                disponibilidad: canchaForm.disponibilidad,
            }
            if (canchaForm.nombre === "" || canchaForm.descripcion === "" || canchaForm.tipo === "" || canchaForm.capacidad === "" || canchaForm.direccion === "" || canchaForm.imagen_URL === "") {
                setError({ message: 'Todos los campos son obligatorios' })
                return;
            }
            const nuevaCancha = await canchaServices.saveCourt(canchaData);
            if (nuevaCancha) {
                setCanchaForm({ nombre: '', descripcion: '', tipo: '', capacidad: '', direccion: '', imagen_URL: '', disponibilidad: '' })
                setPopUpStatus(true);
                setPropsPopUp({ status: true, message: 'Cancha registrada con exito.' })
                setTimeout(() => {
                    setPopUpStatus(false)
                }, 4000);
            }

        } catch (e) {
            setError({ message: e.message })
        }
    }


    const handleChange = ({ target: { name, value } }) => {
        setCanchaForm({ ...canchaForm, [name]: value })
    }

    const handleCloseModal = () => {
        setPopUpStatus(null);
    };

    return (
        <>
            <ModalContainer className={`w-[420px]`} onClose={onClose}>
                <div className='w-full h-full m-auto mt-2 rounded-lg mb-2'>
                    <form className='p-5 rounded-lg overflow-y-auto' onSubmit={handleSubmit}>
                        <p className='font-medium text-white m-2'>Nueva cancha</p>
                        {error?.message &&
                            <p className=" m-1 mx-1 text-red-500 text-xs md:text-sm whitespace-nowrap">
                                🚨 {error.message}
                            </p>}
                        <InputWithLabel onChange={handleChange} value={canchaForm.nombre} type='text' name='nombre' label="Nombre" className='mb-3 ' />
                        <InputWithLabel onChange={handleChange} value={canchaForm.descripcion} type='text' name='descripcion' label="Descripcion" className='mb-3' />
                        <InputWithLabel onChange={handleChange} value={canchaForm.tipo} type='text' name='tipo' label="Tipo de cancha" className='mb-3 ' />
                        <InputWithLabel onChange={handleChange} value={canchaForm.capacidad} type='number' name='capacidad' label="Capacidad Max." className='mb-3' />
                        <InputWithLabel onChange={handleChange} value={canchaForm.direccion} type='text' name='direccion' label="Direccion" className='mb-3' />
                        <InputWithLabel onChange={handleChange} value={canchaForm.imagen_URL} type='text' name='imagen_URL' label="Imagen URL" className='mb-3' />
                        <div>
                            <InputWhithToggleSwitch value={canchaForm.disponibilidad} className='w-full' label='Disponibilidad' name='disponibilidad' onChange={handleChange} />
                        </div>
                        <Button type="button" className='bg-green-500 text-white w-full mt-5' onClick={handleSubmit}>
                            Save
                        </Button>
                    </form>

                    {PopUpStatus && (
                        <PopUp status={propsPopUp.status} message={`${propsPopUp.message}`} onClose={handleCloseModal} />
                    )}
                </div >
            </ModalContainer>
        </>
    )
}

export default ModalNuevaCancha
