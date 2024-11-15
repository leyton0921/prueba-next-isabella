"use client";
import { useParams } from 'next/navigation';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { IGetCarsResponse } from '@/app/core/application/dto/vehicles/get-vehicles-response.dto';
import Spinner from '@/UI/atoms/spiner/spiner';


function MaintenancePage() {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchProjectID = async () => {
            try {
                const response = await fetch(`/api/vehicles/get/${id}`);
                const result: IGetCarsResponse = await response.json();
                setData(result.data);

                console.log(result);
            } catch (error) {
                console.log("Error al obtener los datos", error);
            }
        };

        fetchProjectID();
    }, [id]);

    if (!data) {
        return <Spinner />;
    }

    return (
        <div className={styles.container}>
            <h1>Mantenimiento del Vehículo</h1>
            <div className={styles.vehicleInformation}>
                <img src={data.photo} alt="Foto" width="300" />
                <div > 
                    <h2>ID: {data.id}</h2>
                    <p><strong>Marca:</strong> {data.make}</p>
                    <p><strong>Modelo:</strong> {data.model}</p>
                    <p><strong>Año:</strong> {data.year}</p>
                    <p><strong>Placa:</strong> {data.licensePlate}</p>
                </div>
            </div>

        </div>
    );
}

export default MaintenancePage;