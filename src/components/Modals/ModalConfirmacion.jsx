import React, { useState } from 'react';

function ModalConfirmacion({ mensaje, onConfirmar, onCancel }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-baseBlack p-8 rounded-lg shadow-lg">
                <p className="mb-4 text-sm text-white">{mensaje}</p>
                <div className="flex justify-center">
                    <button onClick={onCancel} className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 text-sm rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400">
                        Cancelar
                    </button>
                    <button onClick={onConfirmar} className="px-4 py-2 bg-red-600 text-white text-sm  rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-700">
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmacion;