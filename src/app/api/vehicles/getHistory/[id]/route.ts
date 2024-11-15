import { NextResponse } from "next/server";
import { vehiclesServices } from "@/app/infrastructure/services/vehicles.service";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const service = new vehiclesServices();

  try {
    const id = parseInt(params.id); 
    const response = await service.findhistoryById(id);
    
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
