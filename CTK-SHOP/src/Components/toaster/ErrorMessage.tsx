import React, { useEffect, useRef, useState } from "react";
import "./ErrorMessage.scss"; // You can style fade-in/out here

const FADE_DURATION = 300; // ms
const ALERT_DURATION = 3000; // ms

export type AlertType = "error" | "success";

interface ErrorMessageProps {
  type: AlertType;
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ type, message }) => {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const fadeTimeout = useRef<number | null>(null);
  const alertTimeout = useRef<number | null>(null);

  useEffect(() => {
    setVisible(true);
    setFadingOut(false);

    if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    if (alertTimeout.current) clearTimeout(alertTimeout.current);

    alertTimeout.current = window.setTimeout(() => {
      setFadingOut(true);
      fadeTimeout.current = window.setTimeout(() => setVisible(false), FADE_DURATION);
    }, ALERT_DURATION);

    return () => {
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      if (alertTimeout.current) clearTimeout(alertTimeout.current);
    };
  }, [message]);

  if (!visible) return null;

  return (
    <div
      className={`notification ${type === "error" ? "is-danger" : "is-success"} fade-${fadingOut ? "out" : "in"}`}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;