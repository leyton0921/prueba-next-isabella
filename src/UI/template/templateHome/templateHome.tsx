import PanelFilter from "@/UI/molecules/filterPanel/filterPanel"
import TableVehicles from "@/UI/organisms/tableCars/tableCars"
import { IGetCarsResponse } from "@/app/core/application/dto/vehicles/get-vehicles-response.dto";
import PanelAccions from "@/UI/molecules/panelAccions/panelAccions";
interface IProps {
    data: IGetCarsResponse;
  }
const TemplaHome = ({data}:IProps) => {
    return (
        <div>
            <div>
                <h1>Gestión de vehiculos</h1>
            </div>
            <PanelFilter/>
            <PanelAccions/>
            <TableVehicles data={data}/>

        </div>
    )
}

export default TemplaHome