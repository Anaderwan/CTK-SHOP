/**
 * CustomAlert component
 * 
 * - Displays a notification to the user (e.g., success or error).
 * - Visual appearance changes based on the `type` value: "success" or "error".
 * - Uses Unicode icons for additional visual context.
 *
 * 
 * Props:
 * @prop {string} message 
 * @prop {'success' | 'error'} type 
 */
import React from "react";

interface CustomAlertProps {
  message: string; 
  type: "success" | "error"; 
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  type,
}) => {
  return (
    <div className={`alert ${type} visible`}>
      <span className="icon">
        {/* Displays an icon depending on the message type */}
        {type === "success" ? "✔️" : "❗"}
      </span>
      <span className="message">{message}</span>
    </div>
  );
};
