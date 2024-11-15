import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";
import styles from "./formfilefild.module.scss"
interface IPropsSelectFile<T extends FieldValues> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    error?: FieldError;
    id?: string;
    accept?: string;
};
export const FormFileField = <T extends FieldValues>({ label, name, control, error, id, accept }: IPropsSelectFile<T>) => {
    return (
        <div className={styles.fieldContainer}>
            <label className={styles.label} htmlFor={id || label.toLowerCase()}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        className={`${styles.input} ${error && styles.inputError}`}
                        type="file"
                        id={id || label.toLowerCase()}
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            field.onChange(file);
                        }}
                        accept={accept}
                    />
                )}
            />
            {error && <p className={styles.error}>{error.message}</p>}
        </div>
    );
};