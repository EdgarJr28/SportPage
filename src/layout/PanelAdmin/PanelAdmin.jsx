import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ItemsCard from '../../components/Cards/ItemsCard';
import ModalVerCancha from '../../components/Modals/ModalVerCancha';
import ButtonAgregar from '../../components/Buttons/ButtonAgregar';
import ModalEditCancha from '../../components/Modals/ModalEditCancha';
import ModalNuevaCancha from '../../components/Modals/ModalNuevaCancha';
import { Canchas } from '../../functions/canchas.service';
import ModalConfirmacion from '../../components/Modals/ModalConfirmacion';

const PanelAdmin = () => {
    const canchaServices = new Canchas();
    const [editData, setEditData] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [modalStatus, setModalStatus] = useState({
        add: false,
        show: false,
        edit: false,
        delete: false
    });
    const [courts, setCourts] = useState([]);

    const fetchCourts = async () => {
        try {
            const courtData = await canchaServices.getCourts();
            setCourts(courtData);
        } catch (error) {
            console.error("Error al obtener las canchas:", error);
        }
    };

    useEffect(() => {
        fetchCourts();
    }, []);

    const handleEdit = (data) => {
        setModalStatus({ ...modalStatus, edit: true });
        setEditData(data);
    };

    const handleShow = (data) => {
        setModalStatus({ ...modalStatus, show: true });
        setEditData(data);
    };

    const handleNuevaCancha = () => {
        setModalStatus({ ...modalStatus, add: true });
    };

    const handleOpenDeleteModal = (data) => {
        setModalStatus({ ...modalStatus, delete: true });
        setDeleteData(data);

    }

    const handleDelete = () => {
        try {
            canchaServices.deleteCourt(deleteData.id);
            fetchCourts();
            setModalStatus({ ...modalStatus, delete: false });
        } catch (error) {
            console.error("Error al eliminar la cancha:", error);
        }

    }


    const handleModalClose = async () => {
        setModalStatus({
            add: false,
            show: false,
            edit: false,
            delete: false
        });
        await fetchCourts();
    };

    return (
        <>
            <div className="bg-[url('/images/fondo.png')] bg-no-repeat bg-cover bg-center min-h-screen pt-16">
                <ButtonAgregar text={`Agregar Cancha`} onClick={handleNuevaCancha} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {courts.map((cancha, index) => (
                        <ItemsCard
                            key={index}
                            item={cancha}
                            onShow={() => handleShow(cancha)}
                            onEdit={() => handleEdit(cancha)}
                            onDelete={() => handleOpenDeleteModal(cancha)}
                        />
                    ))}
                    {modalStatus.show && <ModalVerCancha data={editData} onClose={handleModalClose} />}
                    {modalStatus.edit && <ModalEditCancha data={editData} onClose={handleModalClose} />}
                    {modalStatus.add && <ModalNuevaCancha onClose={handleModalClose} />}
                    {modalStatus.delete && <ModalConfirmacion mensaje={'¿Seguro desea eliminar este item?'} onConfirmar={handleDelete} onCancel={handleModalClose} />}
                </div>
            </div>
        </>
    );
};

export default PanelAdmin;
