import { collection, doc, getDocs } from 'firebase/firestore'
import React from 'react'
import { userCollection } from '../../firebase'



const Prueba = () => {

    const handleTest = async () => {
        try {
            const snapshot = await getDocs(userCollection)
            const userData = await snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()

            }))
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <div>
            <button className="btn bg-gray-400 p-2 border rounded-lg text-white hover:bg-baseBlack hover:border-black hover:text-black" onClick={handleTest}>Prueba</button>
        </div>
    )
}

export default Prueba