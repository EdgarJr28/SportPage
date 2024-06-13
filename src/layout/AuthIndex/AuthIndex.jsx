import React, { useEffect } from 'react'
import AuthModalIndex from '../AuthModal/AuthModal'
import { useCtx } from '../../context/context'

const AuthIndex = () => {
    const { authSession, setModalData, modalData } = useCtx()
    useEffect(() => {
        setModalData({ open: true, modalId: "LOGIN" })
    }, [])
    return (
        <div>
            { /*** LOGIN AND SIGNUP POPUP */
                !authSession && modalData.open && (modalData.modalId === "LOGIN" || modalData.modalId === "SIGNUP") && <AuthModalIndex />
            }

        </div>
    )
}

export default AuthIndex
