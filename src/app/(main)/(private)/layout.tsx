import "../../../styles/globals.scss"
import React from 'react'
import AuthGuard from "./guard/AuthGuard"
import Aside from "@/UI/molecules/aside/aside"



export default function PrivateLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <AuthGuard>
            <Aside />
            <div className="container-main">
            {children}
            </div>

        </AuthGuard>
    )
}