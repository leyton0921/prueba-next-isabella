import React from 'react'
import TemplaHome from '@/UI/template/templateHome/templateHome'
import { vehiclesServices } from '@/app/infrastructure/services/vehicles.service'

interface IProps {
  searchParams: Promise<{
    page: string;
    size: string;
  }>;
}

export default async function Vehicles({ searchParams }: IProps) {

  const useService = new vehiclesServices()

  const params = await searchParams;

  const page = params.page ? parseInt(params.page) : 1;
  const size = params.size ? parseInt(params.size) : 4;

  const data = await useService.findAllVehicles(page, size)

  return (
    <div>
      <TemplaHome data={data}/>
    </div>
  )
}

