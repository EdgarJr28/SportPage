import { useState } from 'react'
import { useCtx } from '../../context/context';
import InputWithLabel from '../Inputs/InputWithLabel';
import Button from '../Buttons/Button';
import { User } from '../../functions/user.service';
import { set } from 'firebase/database';
import PopUp from '../PopUps/PopUp';
import { validateErrorFirebase } from '../../functions/errorValidate.firebase';


const SignUpCard = () => {
   const userInstance = new User();
   const { signUp, setModalData } = useCtx()
   const [error, setError] = useState(null);
   const [PopUpStatus, setPopUpStatus] = useState()
   const [propsPopUp, setPropsPopUp] = useState({
      status: false,
      message: ''
   })

   const [userForm, setUserForm] = useState({
      nombre: "",
      apellido: "",
      email: '',
      password: ''
   })
   const handleCloseModal = () => {
      setPopUpStatus(null);
   };

   const handleSubmit = async (e) => {
      try {
         e.preventDefault();
         let userData = {
            nombre: userForm.nombre,
            apellido: userForm.apellido,
            email: userForm.email,
            password: userForm.password,
            rol: 'user'
         }
         if (userData.nombre === "" || userData.apellido === "" || userData.email === "" || userData.password === "") {
            setError({ message: 'Todos los campos son obligatorios' })
            return;
         }
         const register = await signUp(userData.email, userData.password)
         if (register) {
            await userInstance.saveUser(userData);
            setPopUpStatus(true);
            setPropsPopUp({ status: true, message: 'Usuario registrado con exito.' })
            setModalData({ open: false, modalId: "" });
            localStorage.setItem('userData', JSON.stringify(userData));
         }

      } catch (e) {
         console.log(validateErrorFirebase(e))
         setError({ message: validateErrorFirebase(e)})
         throw e;
      }
   }

   const handleChange = ({ target: { name, value } }) => {
      setUserForm({ ...userForm, [name]: value })
   }

   return (
      <div className='w-full h-full m-auto mt-2 rounded-lg mb-2'>
         {error?.message && <span className="mx-1 text-red-500 text-xs md:text-sm whitespace-nowrap">🚨 {error.message}</span>}
         <form className='p-2 md:p-5 rounded-lg overflow-y-auto' onSubmit={handleSubmit}>
            <p className='font-medium text-white mb-2 text-xs md:text-sm '>Te pediremos algunos datos, esto no tardara mucho! 👋🏻</p>
            <InputWithLabel onChange={handleChange} value={userForm.nombre} type='text' name='nombre' label="Nombre" className='mb-3' />
            <InputWithLabel onChange={handleChange} value={userForm.apellido} type='text' name='apellido' label="Apellido" className='mb-3' />
            <InputWithLabel onChange={handleChange} value={userForm.email} type='mail' name='email' label="Email" className='mb-3' />
            <InputWithLabel onChange={handleChange} value={userForm.password} type='password' name='password' label="Password" className='mb-3' />
            <p className='text-white text-xs md:text-sm my-4'>
               Al continuar, acepto los <strong>Términos de servicio,   </strong> También reconozco la Política de privacidad.
            </p>
            <Button className='bg-transparent border border-white text-white w-full hover:border-green-500 hover:scale-105 transition-all duration-300'>
               Sign Up
            </Button>
         </form>
         {PopUpStatus && (
            <PopUp status={propsPopUp.status} message={`${propsPopUp.message}`} onClose={handleCloseModal} />
         )}
      </div >)
}

export default SignUpCard