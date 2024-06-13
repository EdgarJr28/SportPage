import React, { useEffect, useState } from 'react';
import { Canchas } from '../../functions/canchas.service';
import { Reservas } from '../../functions/Reservar.service';
import CardHorizontalForPlace from '../../components/Cards/CardHorizontalForPlace';
import SearchBar from '../../components/Inputs/SearchBar';
import CardMisReservas from '../../components/Cards/CardMisReservas';
import ModalConfirmacion from '../../components/Modals/ModalConfirmacion';

const ReservarIndex = () => {
    const canchaServices = new Canchas();
    const bookingInstance = new Reservas();
    const [courts, setCourts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState(1);
    const [myBookings, setMyBookings] = useState([]);
    const [finishBooking, setFinishBooking] = useState();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [modalStatus, setModalStatus] = useState({
        finalise: false
    });
    const fetchCourts = async () => {
        try {
            const courtData = await canchaServices.getCourtByStatus();
            setCourts(courtData);
        } catch (error) {
            console.error('Error al obtener las canchas:', error);
        }
    };

    const fetchMyBookings = async () => {
        try {
            const userDataString = localStorage.getItem('userData');
            if (!userDataString) {
                console.error("No se encontraron datos de usuario en el localStorage.");
                return;
            }
            const userData = JSON.parse(userDataString);
            // Obtener el id del usuario
            const userId = userData.id;
            const myBookingsFetch = await bookingInstance.getMyBookings(userId);
            if (myBookingsFetch) {
                const myBookingsData = await Promise.all(myBookingsFetch.map(async (booking) => {
                    const courtData = await canchaServices.getCourtById(booking.canchaId);
                    return {
                        ...booking,
                        ...courtData
                    }
                }));;
                setMyBookings(myBookingsData);
            } else {
                console.error("No se encontraron reservas para el usuario.");
            }
        } catch (error) {
            console.error('Error al obtener las reservas:', error);
        }
    }


    useEffect(() => {
        fetchCourts();
        fetchMyBookings();
    }, []);

    const handleSaveBooking = async (item) => {
        setIsButtonDisabled(true); // Deshabilitar el botón
        try {
            const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
            const bookingSaveData = {
                nombre: item.nombre,
                customerId: userData.id,
                canchaId: item.id,
            };
            const booking = await bookingInstance.saveBooking(bookingSaveData);
            if (booking) {
                fetchCourts();
            }
        } catch (error) {
            console.error("Error al guardar la reserva: ", error);
        } finally {
            setIsButtonDisabled(false); // Rehabilitar el botón al finalizar
        }
    };

    const handleOpenConfirModal = (item) => {
        setFinishBooking(item);
        setModalStatus({ ...modalStatus, finalise: true });
    }

    const handleFinaliseBooking = async () => {
        const booking = await bookingInstance.updateBookingStatus(finishBooking.id, false, finishBooking.canchaId);
        if (booking) {
            setModalStatus({
                finalise: false,
            });
            fetchMyBookings();
        }

    }


    const filteredCourts = courts.filter((court) =>
        court.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };
    const handleModalClose = async () => {
        setModalStatus({
            finalise: false,
        });
        fetchMyBookings();
    };

    return (
        <>
            <div className="bg-[url('/images/fondo.png')] bg-no-repeat bg-cover bg-center min-h-screen pt-16">
                <div className="flex">
                    <button
                        className={`w-1/2 py-2 border-b-2 rounded-sm text-white backdrop-blur-lg hover:scale-95 transition-all duration-300 ${activeTab === 1 ? 'border-blue-500' : 'border-gray-300'
                            }`}
                        onClick={() => {
                            fetchCourts();
                            handleTabClick(1)
                        }}
                    >
                        Reservar
                    </button>
                    <button
                        className={`w-1/2 py-2 border-b-2 rounded-sm text-white backdrop-blur-lg hover:scale-95 transition-all duration-300 ${activeTab === 2 ? 'border-blue-500' : 'border-gray-300'
                            }`}
                        onClick={() => {
                            fetchMyBookings();
                            handleTabClick(2)
                        }}
                    >
                        Mis Reservas
                    </button>
                </div>
                <div className="mt-4">
                    {activeTab === 1 &&
                        /* Pagina 1 */
                        <div>
                            <h1 className="text-lg md:text-3xl font-bold text-center text-white m-5">Reserva tu cancha favorita</h1>
                            <SearchBar onSearch={setSearchTerm} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {filteredCourts.length > 0 ? (<>
                                    {filteredCourts.map((cancha, index) => (
                                        <CardHorizontalForPlace
                                            key={index}
                                            item={cancha}
                                            onClick={() => handleSaveBooking(cancha)}
                                            disabled={isButtonDisabled}
                                        />
                                    ))}
                                </>

                                ) : (
                                    <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center items-center">
                                        <h2 className="w-full text-white text-center mx-auto">No se encuentran canchas activas 🧐</h2>
                                    </div>
                                )}
                            </div>
                        </div>}
                    {activeTab === 2 &&
                        /* Pagina 2 */
                        <>
                            <div>
                                <h1 className="text-lg md:text-3xl font-bold text-center text-white m-5">Tus reservas</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {myBookings.length === 0 ? (<>
                                        <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center items-center">
                                            <h2 className="w-full text-white text-center mx-auto">No tienes reservas activas 🧐</h2>
                                        </div>
                                    </>
                                    ) : (
                                        myBookings.map((cancha, index) => (
                                            <CardMisReservas
                                                key={index}
                                                item={cancha}
                                                onClick={() => handleOpenConfirModal(cancha)}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </>
                    }
                </div>
                {modalStatus.finalise && <ModalConfirmacion mensaje={'¿Seguro desea finalizar la reserva?'} onConfirmar={handleFinaliseBooking} onCancel={handleModalClose} />}
            </div>
        </>
    );
};

export default ReservarIndex;
