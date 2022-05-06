export interface ButtonProps {
  as: "button" | "link";
  onClick?: () => void;
  href?: any;
  className?: string;
  style?: string;
  disabled?: boolean;
}
