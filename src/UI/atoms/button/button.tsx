
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {};

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <button {...props}>
            {children}
        </button>
    );
};

export default Button;
