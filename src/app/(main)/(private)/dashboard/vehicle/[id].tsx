import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface MaintenanceRecord {
  date: string;
  type: string;
  mileage: number;
  notes: string;
}

interface Vehicle {
  photo: string;
  year: number;
  make: string;
  model: string;
  licensePlate: string;
}

export default function VehicleDetailsPage ()  {
  const router = useRouter();
  const { id } = router.query;

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [maintenanceHistory, setMaintenanceHistory] = useState<MaintenanceRecord[] | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(id)

  useEffect(() => {
    if (!id) return;

    const fetchVehicleDetails = async () => {
      try {

        const vehicleResponse = await fetch(`/api/vehicles/get/${id}`);
        const vehicleData = await vehicleResponse.json();
        setVehicle(vehicleData);

    
        const maintenanceResponse = await fetch(`/api/vehicles/getHistory/${id}`);
        const maintenanceData = await maintenanceResponse.json();
        setMaintenanceHistory(maintenanceData);

        setLoading(false);
      } catch (error) {
        console.error("Error", error);
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  if (loading) return <p>Cargando...</p>;

  if (!vehicle) return <p>Vehículo no encontrado</p>;

  return (
    <div>
      <h1>Mantenimientos del vehículo</h1>

      <div style={{ border: "1px solid #e0e0e0", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <img src={vehicle.photo} alt="Vehicle Photo" width="200" />
        <p><strong>Año:</strong> {vehicle.year}</p>
        <p><strong>Marca:</strong> {vehicle.make}</p>
        <p><strong>Modelo:</strong> {vehicle.model}</p>
        <p><strong>Placa:</strong> {vehicle.licensePlate}</p>
      </div>

      <h2>Historial de Mantenimiento</h2>

      {maintenanceHistory && maintenanceHistory.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Kilometraje</th>
              <th>Notas</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceHistory.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.type}</td>
                <td>{record.mileage}</td>
                <td>{record.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron mantenimientos para este vehículo.</p>
      )}
    </div>
  );
};


