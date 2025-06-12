/**
 * Modal component
 *
 * - Displays a modal window (overlay) using React Portals.
 * - Used for editing, adding, and displaying additional information.
 * - Renders content (children) inside the #modal-root div located in `index.html`.
 * - Clicking outside the modal (overlay) closes the window via the `onClose` callback.
 *
 * Props:
 * @prop {() => void} onClose 
 * @prop {React.ReactNode} children 
 */
import React from "react";
import ReactDOM from "react-dom";
import "styles/components/modal.scss"; 

interface Props {
  onClose: () => void; 
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ onClose, children }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null; 
  return ReactDOM.createPortal(
    <>
      {/* Overlay background — clicking it closes the modal */}
      <div className="modal-overlay" onClick={onClose} />
      {/* Modal content */}
      <div className="modal-content">{children}</div>
    </>,
    modalRoot
  );
};

export default Modal;
