import { ButtonProps } from "./Button.types";
import Link from "next/link";

const Button: React.FC<ButtonProps> = ({
  as,
  onClick,
  href,
  className,
  style,
  disabled,
  children,
}) => {
  const styles = {
    button: `py-3 w-[180px] h-[60px] inline-flex justify-center items-center rounded-md border border-transparent bg-black text-base text-white font-medium shadow-sm hover:border-2 hover:border-black hover:bg-white hover:text-black focus:outline-black focus:ring-2 focus:ring-black focus:ring-offset-2 ${style}`,
  };

  if (as === "button") {
    return (
      <button
        className={className || styles.button}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  if (as === "link") {
    return (
      <Link href={href} passHref>
        <a className={className || styles.button}>{children}</a>
      </Link>
    );
  }

  return <a className={className || styles.button}>{children}</a>;
};

export default Button;
