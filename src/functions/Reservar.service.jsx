import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where
} from "firebase/firestore";
import { db } from "../firebase";
import { Canchas } from "./canchas.service";

const canchaServices = new Canchas();

export class Reservas {

    constructor() {

    }

    async saveBooking(booking) {
        try {
            const reservasRef = collection(db, "reservas");

            // Realizamos una consulta para verificar si ya existe una reserva con el mismo canchaId
            const querySnapshot = await getDocs(query(reservasRef, where('canchaId', '==', booking.canchaId), where('status', '==', true)));

            if (!querySnapshot.empty) {
                throw new Error("Ya existe una reserva para esta cancha.");
            }

            const docRef = await addDoc(reservasRef, {
                "nombre": booking.nombre,
                "customerId": booking.customerId,
                "canchaId": booking.canchaId,
                "status": true,
                "createdAt": new Date()
            });
            if (docRef) {
                const cancha = await canchaServices.updateCourtAvailability(booking.canchaId, false);
                if (cancha.success) {
                    return docRef.id;
                }
            }
        } catch (error) {
            console.error("Error ", error.message);
            throw new Error(error.message);
        }
    }

    async getBookings() {
        try {
            const courtRef = collection(db, "canchas");
            const querySnapshot = await getDocs(query(courtRef, where('status', '==', true)));
            const courtDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return courtDocs;
        } catch (error) {
            console.error("Error al obtener las canchas:", error);
        }
    }

    async getMyBookings(userId) {
        try {
            const bookingsRef = collection(db, "reservas");
            const q = query(bookingsRef, where('customerId', '==', userId), where('status', '==', true));
            const querySnapshot = await getDocs(q);
            const bookingDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return bookingDocs;
        } catch (error) {
            console.error("Error al obtener las reservas:", error.message);
            return []; // En caso de error, retorna un array vacío
        }
    }

    async updateBookingStatus(bookingId, newStatus, canchaId) {
        try {
            const bookingRef = doc(db, "reservas", bookingId);
            await updateDoc(bookingRef, { status: newStatus });  // No retorna nada, solo espera a que se complete

            // Si no lanza un error, se asume que la actualización fue exitosa
            const cancha = await canchaServices.updateCourtAvailability(canchaId, true);
            if (cancha.success) {
                console.log(`La reserva con ID ${bookingId} ha sido actualizada a ${newStatus} y la disponibilidad a ${true}`);
                return { success: true, bookingId: bookingId };
            } else {
                return { success: false, message: "Error al actualizar la disponibilidad de la cancha" };
            }
        } catch (error) {
            console.error("Error al actualizar el documento:", error.message);
            return { success: false, message: "Error al actualizar el documento: " + error.message };
        }
    }
}