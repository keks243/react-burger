import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRootElement = document.querySelector("#modal");

const Modal = (props) => {
  const element = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    modalRootElement.appendChild(element);

    return () => {
      modalRootElement.removeChild(element);
    };
  });

  const escape = (event) => {
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
    props.setActive(false)
}

  return createPortal(
    <ModalOverlay onClose={props.closeModal}>
      <section
        className={styles.container}
        onClick={(event) => event.stopPropagation()}
      >
        <section className={styles.modalHeader}>
          <h2 className="text text_type_main-large">{props.title}</h2>
          <button className={styles.close} onClick={handleCloseModal}>
            <CloseIcon type="primary" />
          </button>
        </section>
        {props.children}
      </section>
    </ModalOverlay>,
    element
  );
};

Modal.propTypes = {
  setActive: PropTypes.func.isRequired,
  children: PropTypes.element,
  
};

export default Modal;
