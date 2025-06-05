import React from "react";
import styles from "./CustomAlert.module.scss";

interface CustomAlertProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  type,
  onClose,
}) => {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <span className={styles.icon}>
        {type === "success" ? "✔️" : "❗"}
      </span>
      <span className={styles.message}>{message}</span>
      <button className={styles.close} onClick={onClose}>
        ×
      </button>
    </div>
  );
};
