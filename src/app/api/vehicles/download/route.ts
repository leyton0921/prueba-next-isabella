import { HttpClient } from "@/app/infrastructure/utils/client-http";
import { NextResponse } from 'next/server';

export async function GET(_: Request) {
    try {
        const httpClient = new HttpClient();

        const fileBlob = await httpClient.getFile('projects/report/download');

        const headers = new Headers();
        headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        headers.set('Content-Disposition', 'attachment; filename=archivo-descargado.xlsx');

        return new NextResponse(fileBlob, { status: 200, headers });
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
        return new NextResponse('Error al procesar la solicitud de archivo', { status: 500 });
    }
}