import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase";
import { User } from "../functions/user.service";


const Context = createContext("");
export const useCtx = () => useContext(Context);

/* 
Context es una hook propio de react para manejar el comportamiento de variales y componentes
en un entorno local.
*/
export function CtxProvider({ children }) {

    /* Instanciamos los servicios del usuario */
    const userInstance = new User();
    /*
    Instnaciamos los useStates de todos nuestros componentes que usaremos en el proyecto
    */
    const [authSession, setAuthSession] = useState(null);
    const [modalFormOpen, setModalFormOpen] = useState('');
    const [data, setData] = useState({});
    const [modalConfirmacionAbierto, setModalConfirmacionAbierto] = useState(false);
    const [modalEmpleado, setModalEmpleado] = useState(false);
    const [mensajeEnviado, setMensajeEnviado] = useState([])
    const [modalData, setModalData] = useState({ open: false, modalId: "" })
    const [userSessionData, setUserSessionData] = useState({})

    useEffect(() => {
        // Verificar si el usuario ya está autenticado al cargar la página
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthSession(user);
        });

        // guardar la session del usuario en el state
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUserSessionData(userData);
        }

        // Limpia el suscriptor al desmontar el componente
        return () => unsubscribe();


    }, [])


    const login = async (email, password) => {
        try {
            const session = await signInWithEmailAndPassword(auth, email, password);
            const userData = await userInstance.getUser(email);
            setUserSessionData(userData)
            localStorage.setItem('userData', JSON.stringify(userData));
            return session
        } catch (e) {
            throw e;
        }
    }

    const signUp = async (email, password) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            const userData = await userInstance.getUser(email);
            setUserSessionData(userData)
            localStorage.setItem('userData', JSON.stringify(userData));
            return user
        } catch (e) {
            throw e;
        }
    }

    /* funcion para cerrar sesion del usuario */
    const cerrarSesion = async () => {
        try {
            await signOut(auth);
            setAuthSession(null);
            localStorage.removeItem('userData');
            setUserSessionData(null);
        } catch (e) {
            throw e;
        }
    };

    /* Devuelve componente de los hooks implementados en el context*/
    return (
        <Context.Provider value={{
            authSession, setAuthSession,
            cerrarSesion,
            login, signUp,
            userSessionData, setUserSessionData,
            modalFormOpen, setModalFormOpen,
            data, setData,
            modalConfirmacionAbierto, setModalConfirmacionAbierto,
            modalEmpleado, setModalEmpleado,
            mensajeEnviado, setMensajeEnviado,
            modalData, setModalData
        }}>
            {children}
        </Context.Provider>
    );
};