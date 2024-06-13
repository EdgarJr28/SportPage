import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD1Bi0EGqvnmuVIZa0Sx33BFMANXGdjml0",
    authDomain: "sport-199d4.firebaseapp.com",
    projectId: "sport-199d4",
    storageBucket: "sport-199d4.appspot.com",
    messagingSenderId: "1008640841106",
    appId: "1:1008640841106:web:071e3cfb6bd21450431d4b",
    measurementId: "G-SP6YG70M8V"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);

/* Creamos conexion con ire base. */
export const db = getFirestore(app);
export const auth = getAuth(app);

/* Collections */
export const userCollection = collection(db, "usuarios")

