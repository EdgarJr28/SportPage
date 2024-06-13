import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where
} from "firebase/firestore";
import { db } from "../firebase";

export class Canchas {
    constructor() { }

    async saveCourt(cancha) {
        try {
            const docRef = await addDoc(collection(db, "canchas"), {
                "nombre": cancha.nombre,
                "tipo": cancha.tipo,
                "descripcion": cancha.descripcion,
                "disponibilidad": cancha.disponibilidad,
                "capacidad": cancha.capacidad,
                "direccion": cancha.direccion,
                "imagen_URL": cancha.imagen_URL,
                "createdAt": new Date()
            });
            return docRef.id;
        } catch (error) {
            console.error("Error ", error.message);
            throw new Error(error.message);
        }
    }

    async getCourts() {
        try {
            const courtRef = collection(db, "canchas");
            const querySnapshot = await getDocs(courtRef);
            const courtDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return courtDocs;
        } catch (error) {
            console.error("Error al obtener las canchas:", error);
        }
    }

    async getCourtById(id) {
        try {
            const courtRef = doc(db, "canchas", id);
            const docSnap = await getDoc(courtRef);
            if (docSnap.empty) {
                throw new Error("No se encontró ningún documento con ese ID.");
            }
            return docSnap.data();
        } catch (error) {
            console.error("Error obteniendo el documento:", error.message);
            throw error;
        }
    }
    

    async updateCourt(id, newData) {
        try {
            const courtRef = doc(db, "canchas", id);
            await updateDoc(courtRef, newData);
            return { success: true, message: "Documento actualizado correctamente" };
        } catch (error) {
            console.error("Error al actualizar el documento:", error.message);
            return { success: false, message: "Error al actualizar el documento: " + error.message };
        }
    }

    async deleteCourt(id) {
        try {
            const courtRef = doc(db, "canchas", id);
            await deleteDoc(courtRef);
            return { success: true, message: "Documento eliminado correctamente" };
        } catch (error) {
            console.error("Error al eliminar el documento:", error.message);
            return { success: false, message: "Error al eliminar el documento: " + error.message };
        }
    }

    async getCourtByStatus() {
        try {
            const courtRef = collection(db, "canchas");
            const querySnapshot = await getDocs(query(courtRef, where('disponibilidad', '==', true)));
            const courtDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return courtDocs;
        } catch (error) {
            console.error("Error al obtener el usuario:", error.message);
        }
    }

    async updateCourtAvailability(id, disponibilidad) {
        try {
            const courtRef = doc(db, "canchas", id);
            await updateDoc(courtRef, { disponibilidad: disponibilidad });
            return { success: true, message: "Disponibilidad de la cancha actualizada correctamente" };
        } catch (error) {
            return { success: false, message: "Error al actualizar la disponibilidad de la cancha: " + error.message };
        }
    }

}