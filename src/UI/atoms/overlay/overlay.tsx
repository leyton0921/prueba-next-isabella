import styles from "./overlay.module.scss";
import React, { ReactNode } from "react";

interface IOverlayProps {
    children: ReactNode;
}

const Overlay: React.FC<IOverlayProps> = ({ children }) => {

    return (
        <div className={styles.overlay}>
            {children}
        </div>

    )
}

export default Overlay