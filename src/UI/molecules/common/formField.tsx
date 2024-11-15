"use client"
import { Input } from "@/UI/atoms/input/input";
import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";
import styles from "./formfile.module.scss"


interface IPropsFormField<T extends FieldValues> {
    label: string;
    type: string;
    name: Path<T>;
    control: Control<T>
    error?: FieldError;
    id?: string;
    placeholder?: string
}

export const FormField = <T extends FieldValues>({
    label,
    type,
    name,
    control,
    id,
    error,
    placeholder
}: IPropsFormField<T>) => {
    return (

        <div className={styles.container}>
            <label htmlFor={id||label.toLowerCase()} >{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (

                    <Input
                        id={id || label.toLowerCase()}
                        type={type}
                        error={error?.message}
                        placeholder={placeholder || `Ingrese su ${label.toLowerCase()}`}
                        {...field}
                        className={styles.input}
                       
                    />
                )}
            />

        </div>
    )
}