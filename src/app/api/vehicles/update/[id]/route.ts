import { NextResponse } from "next/server";
import { vehiclesServices } from "@/app/infrastructure/services/vehicles.service";
import { IVehicleRequest } from "@/app/core/application/dto/vehicles/vehicle-request.dto";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: number }> }) {
    const service = new vehiclesServices();

    try {
        const body: IVehicleRequest = await request.json();
        const id = (await params).id;
        const response = await service.update(id, body);

        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({ message: 'Error' }, { status: 500 })
    }
}