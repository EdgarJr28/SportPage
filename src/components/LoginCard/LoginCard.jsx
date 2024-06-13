import React, { useState } from 'react'
import Image from '../Image/Image'
import InputWithLabel from '../Inputs/InputWithLabel'
import Button from '../Buttons/Button';
import { useCtx } from '../../context/context';
import { validateErrorFirebase } from '../../functions/errorValidate.firebase';
import { Link } from 'react-router-dom';

const LoginCard = () => {
    const { login, setModalData } = useCtx();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleRegister = () => {
        setModalData({ open: true, modalId: "SIGNUP" });
    }
    const handleChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
    }

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            const verify = await login(formData.email, formData.password);
            if (verify) setFormData({ email: '', password: '' }); setModalData({ open: false, modalId: "" });

        } catch (e) {
            setError(validateErrorFirebase(e))
            throw e;
        }
    }

    return (
        <div className='w-[90%] m-auto py-14 bg-transparent'>
            <form className='p-2 md:p-5 rounded-lg' onSubmit={onSubmit}>
                <p className='font-medium text-white mb-6'>Bienvenido de nuevo! 👋🏻</p>
                {error && <p className="m-1 mx-1 text-red-500 text-xs md:text-sm whitespace-nowrap">🚨 {error}</p>}
                <InputWithLabel onChange={handleChange} value={formData.email} type='text' name='email' label="Email" className='mb-3' />
                <InputWithLabel onChange={handleChange} value={formData.password} type='password' name='password' label="Password" className='mb-3' />
                <Button className='bg-transparent border border-white text-white w-full mt-2 hover:border-green-500 hover:scale-105 transition-all duration-300'>Login</Button>
                <p className='text-white mt-6 text-sm font-small'>
                    Si no tienes cuenta te invitamos a crear una para mejor experiencia <Link onClick={handleRegister} className='text-white font-semibold cursor-pointer hover:scale-110 hover:text-green-500 transition-all duration-300'>Registrate</Link>
                </p>
            </form>
        </div>

    )
}

export default LoginCard
