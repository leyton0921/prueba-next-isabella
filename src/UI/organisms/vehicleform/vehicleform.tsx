'use client';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormField } from "@/UI/molecules/common/formField";
import { FormFileField } from "@/UI/molecules/common/formfilefield/formfilefield";
import Button from "@/UI/atoms/button/button";
import { IVehicleRequest } from "@/app/core/application/dto/vehicles/vehicle-request.dto";
import { useEffect } from "react";
import styles from "./vehicleform.module.scss";

interface IProps {
    closeModal: () => void;
    projectID?: number;
}

const vehicleSchema = yup.object().shape({
    make: yup
        .string()
        .required('El campo es obligatorio.'),
    model: yup
        .string()
        .required('El campo es obligatorio.'),
    year: yup
        .string()
        .required('El campo es obligatorio.'), 
    licensePlate: yup
        .string()
        .required('El campo es obligatorio.'),
    file: yup
        .mixed<File>()
        .nullable()
        .required('El campo es obligatorio.'),
});

const VehicleForm = ({ closeModal, projectID }: IProps) => {
    const router = useRouter();
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<IVehicleRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(vehicleSchema)
    });

    useEffect(() => {
        if (projectID) {
            const fetchVehicleData = async () => {
                try {
                    const response = await fetch(`/api/vehicles/get/${projectID}`);
                    if (!response.ok) {
                        throw new Error("Error al obtener los datos del vehículo");
                    }
                    const data = await response.json();

                    setValue('make', data.make);
                    setValue('model', data.model);
                    setValue('year', data.year.toString());  
                    setValue('licensePlate', data.licensePlate);

                } catch (error) {
                    console.error("Error al obtener los datos del vehículo:", error);
                }
            };

            fetchVehicleData();
        } else {
            reset(); 
        }
    }, [projectID, setValue, reset]);

    const handleCreateOrUpdate = async (data: IVehicleRequest) => {
        try {
            const formData = new FormData();
            formData.append("make", data.make);
            formData.append("model", data.model);
            formData.append("year", data.year.toString()); 
            formData.append("licensePlate", data.licensePlate);

            if (data.file instanceof File) {
                formData.append("file", data.file);
            } else {
                throw new Error("La foto no es un archivo válido");
            }

            let response;
            if (projectID) {
               
                response = await fetch(`/api/vehicles/update/${projectID}`, {
                    method: "PATCH",
                    body: formData,
                });
            } else {
               
                response = await fetch("/api/vehicles/post", {
                    method: "POST",
                    body: formData,
                });
            }

            if (!response.ok) {
                throw new Error("Error al registrar o actualizar el vehículo");
            }

            console.log("Vehículo registrado o actualizado exitosamente.");
            closeModal();

            const result = await response.json();
            console.log("Respuesta del servidor:", result);
            router.refresh();  
        } catch (error) {
            console.error("Error al registrar o actualizar vehículo:", error);
            alert('Ocurrió un error al procesar la solicitud. Intenta de nuevo.');
        }
    };

    return (
        <form className={styles.vehicleForm} onSubmit={handleSubmit(handleCreateOrUpdate)}>
            <button onClick={closeModal}>x</button>
            <FormField<IVehicleRequest>
                control={control}
                type="text"
                name="make"
                label="Marca"
                error={errors.make}
                placeholder="Ingresa la marca"
            />
            <FormField<IVehicleRequest>
                control={control}
                type="text"
                name="model"
                label="Modelo"
                error={errors.model}
                placeholder="Ingresa el modelo"
            />
            <FormField<IVehicleRequest>
                control={control}
                type="text"
                name="year"
                label="Año"
                error={errors.year}
                placeholder="Ingresa el año"
            />
            <FormField<IVehicleRequest>
                control={control}
                type="text"
                name="licensePlate"
                label="Placa"
                error={errors.licensePlate}
                placeholder="Ingresa la placa"
            />
            <FormFileField<IVehicleRequest>
                control={control}
                name="file"
                label="Foto"
                error={errors.file}
            />
            <Button type="submit" className={styles.button}>
                {projectID ? "Actualizar" : "Agregar"} Vehículo
            </Button>
        </form>
    );
};

export default VehicleForm;
