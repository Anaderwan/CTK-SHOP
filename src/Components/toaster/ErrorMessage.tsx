/**
 * ErrorMessage component
 *
 * - Displays a temporary warning message (error/success) with automatic disappearance.
 * - Uses two timers: one for display duration, another for the fade-out effect.
 * - If the message changes, the animation restarts, even if the message is the same.
 * - Usage: useful for displaying errors after validation, saving data, etc.
 */
import { useEffect, useRef, useState } from "react";
import 'styles/components/alert.scss'; 
import 'styles/components/error-message'; 

const FADE_DURATION = 300; 
const ALERT_DURATION = 3000; 

interface ErrorMessageProps {
  message: string | null | undefined; 
  type: "error" | "success"; 
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(false); 
  const [fadingOut, setFadingOut] = useState(false); 
  const [internalMessage, setInternalMessage] = useState<string | null | undefined>(null);

  const fadeTimeout = useRef<number | null>(null); 
  const alertTimeout = useRef<number | null>(null); 

  useEffect(() => {
    if (!message) {
      setVisible(false);
      setInternalMessage(null);
      return;
    }

    setVisible(false); 
    setFadingOut(false);

    if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    if (alertTimeout.current) clearTimeout(alertTimeout.current);

    const timeoutId = window.setTimeout(() => {
      setInternalMessage(message);
      setVisible(true);
     
      alertTimeout.current = window.setTimeout(() => {
        setFadingOut(true);
        
        fadeTimeout.current = window.setTimeout(() => setVisible(false), FADE_DURATION);
      }, ALERT_DURATION);
    }, 10);
    
    return () => {
      clearTimeout(timeoutId);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      if (alertTimeout.current) clearTimeout(alertTimeout.current);
    };
  }, [message]);
  
  if (!visible || !internalMessage) return null;

  const displayMessage = internalMessage.split('-')[0];

  return (
    <div className={`notification is-${type} fade-${fadingOut ? "out" : "in"}`}>
      {displayMessage}
    </div>
  );
};
export default ErrorMessage;