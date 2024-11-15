import React from "react";
import styles from "./input.module.scss"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    type?: string;
    name?: string;
    error?: string;
}

export const Input = ({
    placeholder,
    type = "text",
    name,
    error,
    className,
    ...props
}: InputProps) => {
    return (
        <div className={styles.container}>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                className={error?styles.error:className}
                {...props}
            />
            {error&& <p className={styles.errorText}>{error}</p>}
        </div>
    )
}