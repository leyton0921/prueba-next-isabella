"use client"
import styles from "./aside.module.scss";
import Button from "@/UI/atoms/button/button";
import { IoExitOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { TbBusStop } from "react-icons/tb";
import { BsCarFront } from "react-icons/bs";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/app/api/auth/[...nextauth]/route";

const Aside = () => {

    const currentPath = usePathname();
    const handleSignOut = async () => {
        await signOut({
            callbackUrl: '/'
        });
    };

    const { data: session  } = useSession();
    const sessionUser = session as CustomSession;

    return (
        <aside className={styles.Aside}>
            <div className={styles.containetrTitle}>
                <TbBusStop size={30} />
                <h1>Transport Solutions</h1>
            </div>

            <div className={styles.containerUser}>
            <HiMiniUserCircle size={50}/>
            <p>{sessionUser?.user.name}</p>

            </div>

            <div className={styles.buttonsContainer}>
                <Link href="/dashboard/vehicles" className={`${styles.buttons} ${currentPath === "/dashboard/vehicles" ? styles.active : ""}`}> <BsCarFront/> Vehiculos</Link>
                <Button className={styles.buttons} onClick={handleSignOut}><IoExitOutline /> Cerrar sesion</Button>
            </div>
        </aside>
    )
}

export default Aside