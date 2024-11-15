"use client"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { FormField } from "@/UI/molecules/common/formField";
import styles from "./loginForm.module.scss"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ErrorResponse } from "@/app/core/application/dto/common/error-resonse.dto";
import { FieldError } from "@/app/core/application/dto/common/error-resonse.dto";
import { ILoginRequest } from "@/app/core/application/dto/auth/login-request.dto";
import { PiCarDuotone } from "react-icons/pi";
import Button from "@/UI/atoms/button/button";
import { HiOutlineLockClosed } from "react-icons/hi";



const loginSchema = yup.object()
    .shape({
        email: yup
            .string()
            .email("el correo es inválido")
            .required("El correo es obligatorio"),
        password: yup
            .string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .required("La contraseña es obligatoria")
    })

export const LoginForm = () => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<ILoginRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(loginSchema)
    })

    const router = useRouter()
    const handleLogin = async (data: ILoginRequest) => {
        console.log(data);
        //SERVICE LOGIN
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            console.log(result);

            if (result?.error) {
                console.log("Ocurrio un error", JSON.parse(result.error));
                handleError(JSON.parse(result.error))
                return;
            }
            router.push("/dashboard/vehicles")
        } catch (error) {
            console.log(error);
        }
    };

    const handleError = (error: unknown) => {
        const erroData = error as ErrorResponse;
        if (erroData && erroData.errors) {
            if (Array.isArray(erroData.errors) && "field" in erroData.errors[0]) {
                erroData.errors.forEach((fieldError) => {
                    const { field, error } = fieldError as FieldError;
                    setError(field as keyof ILoginRequest, {
                        message: error,
                    });
                });
            } else {
                if ("message" in erroData.errors[0]) {
                    setError("email", {
                        message: erroData.errors[0].message,
                    });
                }
            }
        }
    };

    return (
        <form action="" onSubmit={handleSubmit(handleLogin)} className={styles.Form}>
            <div className={styles.containerTitle}>
                <PiCarDuotone size={50}/>
                <h2>Transport Solutions S.A</h2>
            </div>
            <p>Inicia sesion en tu cuenta y gestiona tu flota de vehiculos</p>
            <div className={styles.campos}>
                <FormField<ILoginRequest>
                    control={control}
                    type="email"
                    label="Correo Electrónico"
                    name="email"
                    error={errors.email}
                    placeholder="Ingresa tu correo"
                />

                <FormField<ILoginRequest>
                    control={control}
                    type="password"
                    label="Contraseña"
                    name="password"
                    error={errors.password}
                    placeholder="Ingresa tu contraseña"
                />
            </div>

            <Button type="submit" className={styles.buttonSend}><HiOutlineLockClosed size={15}/> Iniciar sesión</Button>

            <div className={styles.linkContainer}><Link href="/" className={styles.Link}>¿Problemas para iniciar sesión? Contacta al
                administrador del sistema</Link></div>
        </form>
    )
}