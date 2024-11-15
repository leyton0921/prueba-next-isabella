import { Input } from "@/UI/atoms/input/input"
import Button from "@/UI/atoms/button/button"
import styles from "./filterPanel.module.scss"
import ButtonFiletr from "@/UI/atoms/buttonFilter/buttonfilter"

const PanelFilter = () => {

    return (
        <div className={styles.containerAll}>
            <div className={styles.container}>
                <p>Placa</p>
                <Input></Input>
            </div>

            <div className={styles.container}>
                <p>Año</p>
                <Input></Input>
            </div>

            <div className={styles.container}>
                <p>Marca</p>
                <Input></Input>
            </div>

            <div className={styles.container}>
                <p>Modelo</p>
                <Input></Input>
            </div>

            <div className={styles.accions}>
            <ButtonFiletr/>
                <Button>Limpiar</Button>

            </div>
        </div>
    )
}

export default PanelFilter