import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export class User {
    constructor() { }

    async saveUser(user) {
        try {
            const docRef = await addDoc(collection(db, "usuarios"), {
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                rol: user.rol,
                createdAt: new Date()
            });
            return docRef.id;
        } catch (error) {
            console.error("Error ", error.message);
            throw new Error(error.message);
        }


    }

    async getUser(email) {
        try {
            // Obtener una referencia a la colección "usuarios"
            const usuariosRef = collection(db, "usuarios");
            // Realizar la consulta para obtener el usuario por su correo electrónico
            const querySnapshot = await getDocs(query(usuariosRef, where('email', '==', email)));
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                return {
                    id: userDoc.id,
                    ...userDoc.data()
                };
            }
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
        }
    }


    isAuthenticated() {
        return this.isAuthenticated;
    }
}