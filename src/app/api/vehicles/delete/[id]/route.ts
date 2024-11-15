import { NextResponse } from "next/server";
import { vehiclesServices } from "@/app/infrastructure/services/vehicles.service";


export async function DELETE(_: Request, {params} : {params: Promise<{id: number}>}) {
    const service = new vehiclesServices();

    try {
        const id = (await params).id
        await service.deleteVehicle(id);

        return NextResponse.json({message: 'Eliminado'}, {status: 200});

    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({message: 'Error'}, {status: 500})
        
    }
}