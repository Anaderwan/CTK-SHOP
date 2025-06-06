import { useEffect, useRef, useState } from "react";

const FADE_DURATION = 300; // ms
const ALERT_DURATION = 3000; // ms

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

    // To retrigger animation even if message is same:
    setVisible(false);  // hide current alert first
    setFadingOut(false);

    // Clear timers
    if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    if (alertTimeout.current) clearTimeout(alertTimeout.current);

    // Show alert on next tick with new message
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

  // Strip the unique suffix added in App (e.g. "Error message-1686001234567" → "Error message")
  const displayMessage = internalMessage.split('-')[0];

  return (
    <div className={`notification is-${type} fade-${fadingOut ? "out" : "in"}`}>
      {displayMessage}
    </div>
  );
};

export default ErrorMessage;
