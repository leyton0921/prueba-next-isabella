'use client'
import { IGetCarsResponse } from "@/app/core/application/dto/vehicles/get-vehicles-response.dto";
import styles from "./tableCars.module.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuTimerReset } from "react-icons/lu";
import Pagination from "@/UI/molecules/pagination/pagination";
import Modal from "../modal/modal";



interface IProps {
  data: IGetCarsResponse;
}

const TableVehicles = ({ data }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null); 

  const router = useRouter();

  const handleDelete = async (id: number) => {
    const isConfirm = confirm("¿Estás seguro de eliminar este proyecto?");
    if (!isConfirm) return;

    try {
      await fetch(`/api/vehicles/delete/${id}`, {
        method: 'DELETE'
      });
      console.log("Eliminado");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true); 
  };


  return (
    <>
      <table className={styles.projectsTable}>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Placa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((vehicle) => (
            <tr key={vehicle.id}>
              <td><img src={vehicle.photo} alt="Vehicle Photo" /></td>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>{vehicle.licensePlate}</td>
              <td className={styles.accions}>
                <div className={styles.divAccions}>
                  <button
                
                    onClick={() => handleEdit(vehicle)} 
                  >
                    <FiEdit/>
                  </button>
                  <button onClick={() => router.push(`/dashboard/vehicles/maintenance/${vehicle.id}`)}><LuTimerReset/></button>

                  <button
                   
                    onClick={() => handleDelete(vehicle.id)} 
                  >
                    <RiDeleteBinLine/>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <Pagination data={data}/>
      </table>

  
      {isModalOpen && selectedProject && (
        <Modal
          onClose={() => setIsModalOpen(false)} 
          projectID={selectedProject.id} 
       
        />
      )}
    </>
  );
};


export default TableVehicles;
