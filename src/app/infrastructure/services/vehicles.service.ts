import { HttpClient } from "../utils/client-http";
import { IGetCarsResponse } from "@/app/core/application/dto/vehicles/get-vehicles-response.dto";
import { Datum } from "@/app/core/application/dto/vehicles/get-vehicles-response.dto";
import { IGetHistoryResponse } from "@/app/core/application/dto/vehicles/get-history-response.dto";
import { IVehicleRequest } from "@/app/core/application/dto/vehicles/vehicle-request.dto";


export class vehiclesServices {
  private clientHttp: HttpClient;

  constructor() {
    this.clientHttp = new HttpClient();
  }

  async findAllVehicles(page: number = 0, size: number = 0) {
    try {
      const response = this.clientHttp.get<IGetCarsResponse>(`vehicles?page=${page}&size=${size}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


      async create(body: IVehicleRequest) {
        try {
          const response = this.clientHttp.post<IGetCarsResponse, IVehicleRequest>('vehicles', body);
          return response;
        } catch (error) {
          console.log(error);
        }
      }

  async deleteVehicle(id: number): Promise<void> {
    try {
      const response = await this.clientHttp.delete(`vehicles/${id}`);
      return response;

    } catch (error) {
      console.error('Error en la eliminación del proyecto:', error);
      throw error;
    }
  }

  async findhistoryById(id: number): Promise<IGetHistoryResponse> {
    try {
      const response = await this.clientHttp.get<IGetHistoryResponse>(`vehicles/${id}/maintenance`);
      return response;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
    async findById(id: number): Promise < Datum > {
      try {
        const response = await this.clientHttp.get<Datum>(`vehicles/${id}`);
        return response;

      } catch(error) {
        console.log(error);
        throw error;
      }


    }



      async update(id: number, body: IVehicleRequest) {
        try {
          const response = this.clientHttp.patch<Datum, IVehicleRequest>(`vehicles/${id}`, body);
          return response;

        } catch (error) {
          console.log(error);
          throw error;
        }
      }



  }