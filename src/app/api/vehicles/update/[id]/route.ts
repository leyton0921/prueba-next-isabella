import { NextResponse } from "next/server";
import { vehiclesServices } from "@/app/infrastructure/services/vehicles.service";
import { IVehicleRequest } from "@/app/core/application/dto/vehicles/vehicle-request.dto";

export async function PATCH(request: Request, { params }: { params: { id: number } }) {
    const service = new vehiclesServices();

    try {
   
        const body: IVehicleRequest = await request.json();


        const { id } = params;

     
        const response = await service.update(id, body);

        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.error('Error updating vehicle:', error);


        return NextResponse.json({ message: 'Error al actualizar el vehículo. Por favor intente nuevamente.' }, { status: 500 });
    }
}
