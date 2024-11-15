"use client"
import React from "react";
import styles from "./pagination.module.scss";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { IGetCarsResponse } from "@/app/core/application/dto/vehicles/get-vehicles-response.dto";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    data: IGetCarsResponse;
}

const Pagination: React.FC<PaginationProps> = ({ data }) => {
    const router = useRouter();
    const searchParams = useSearchParams();


    const onPageChange = (newPage: number) => {

        console.log("Navigating to page:", newPage);

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());


        router.push(`/dashboard/vehicles?${params.toString()}`);
    };


    const currentPage = data.metadata.currentPage

    return (
        <div className={styles.pagination}>

            <button
                className={styles.paginationButton}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <MdNavigateBefore />
            </button>


            <span>Página {currentPage} de {data.metadata.totalPages}</span>


            <button
                className={styles.paginationButton}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === data.metadata.totalPages}
            >
                <MdNavigateNext />
            </button>
        </div>
    );
};

export default Pagination;
