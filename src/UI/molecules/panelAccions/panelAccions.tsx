'use client'
import { SiMicrosoftexcel } from "react-icons/si";
import { IoAddCircleSharp } from "react-icons/io5";
import styles from "./panelAccions.module.scss";
import Modal from "@/UI/organisms/modal/modal";
import { useState } from "react";

const PanelAccions = () => {
  
    const [isModalOpen, setIsModalOpen] = useState(false);

 
    const openModal = () => {
        setIsModalOpen(true);
    };

  
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const downloadReport = async () => {
        try {
            const response = await fetch('/api/vehicles/download');

            if (!response.ok) {
                throw new Error('No se pudo descargar el archivo');
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte-proyecto.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    };

    return (
        <div className={styles.container}>
            <button
                className={styles.addVehicle}
                onClick={openModal}
            >
                <IoAddCircleSharp className={styles.add} size={15} /> Agregar Vehículo
            </button>

            <button className={styles.download} onClick={downloadReport}>
                <SiMicrosoftexcel size={15} /> Descargar reporte
            </button>

            {isModalOpen && (
                <Modal onClose={closeModal}>
                </Modal>
            )}
        </div>
    );
};

export default PanelAccions;
