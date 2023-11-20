import React from "react";
import styles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return (
    <section className={styles.container} onClick={props.onClose}>
      {props.children}
    </section>
  );
};

export default ModalOverlay;
