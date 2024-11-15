import Overlay from "@/UI/atoms/overlay/overlay"
import VehicleForm from "../vehicleform/vehicleform"


interface IProps {
    onClose: () => void;
    projectID?: number ; 
}

const Modal = ({ onClose, projectID }: IProps) => {
    return(
        <Overlay>
            <VehicleForm closeModal={onClose} projectID={projectID}/>
        </Overlay>
    )
}

export default Modal