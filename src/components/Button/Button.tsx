import React, { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
