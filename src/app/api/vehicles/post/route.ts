import { vehiclesServices } from "@/app/infrastructure/services/vehicles.service";
import { NextResponse } from "next/server";
import { IVehicleRequest } from "@/app/core/application/dto/vehicles/vehicle-request.dto";

export async function POST(request: Request) {
    const service = new vehiclesServices();

    try {
  
        const formData = await request.formData();
        

        const make = formData.get('make')?.toString() || '';
        const model = formData.get('model')?.toString() || '';
        const year = formData.get('year')?.toString() || '';
        const licensePlate = formData.get('licensePlate')?.toString() || '';
        const file = formData.get('file') as File ;

  
        const vehicleRequest: IVehicleRequest = {
            make,
            model,
            year,
            licensePlate,
            file,  
        };

        const response = await service.create(vehicleRequest);

        return NextResponse.json(response, { status: 200 });
    } catch (error: unknown) {
        console.error("Error en la API de vehículos:", error);
        return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
    }
}
