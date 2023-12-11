import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

interface ModalProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}

const modalRootElement: HTMLElement | null = document.querySelector("#modal");

const Modal: React.FC<ModalProps> = (props) => {
  const element: HTMLDivElement = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    if (modalRootElement) {
      modalRootElement.appendChild(element);
    }

    return () => {
      if (modalRootElement) {
        modalRootElement.removeChild(element);
      }
    };
  }, [element]);

  const escape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escape, false);

    return () => {
      document.removeEventListener("keydown", escape, false);
    };
  }, []);

  const handleCloseModal = () => {
    props.setActive(false);
  };

  return createPortal(
    <ModalOverlay onClose={handleCloseModal}>
      <section
        id="modal"
        className={styles.container}
        onClick={(event) => event.stopPropagation()}
      >
        <section className={styles.modalHeader}>
          <h2 className="text text_type_main-large">{props.title}</h2>
          <button id="closeBtn" className={styles.close} onClick={handleCloseModal}>
            <CloseIcon type="primary" />
          </button>
        </section>
        {props.children}
      </section>
    </ModalOverlay>,
    element
  );
};

export default Modal;
