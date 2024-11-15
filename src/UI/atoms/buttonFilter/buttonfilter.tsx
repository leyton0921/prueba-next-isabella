import Button from "../button/button"
import { AiOutlineFilter } from "react-icons/ai";
import styles from "./buttonFilter.module.scss"

const ButtonFiletr = () => {
    return (
        <div>
            <Button className={styles.Button}>
                <AiOutlineFilter size={20} />
                Filtrar
            </Button>
        </div>


    )
}

export default ButtonFiletr