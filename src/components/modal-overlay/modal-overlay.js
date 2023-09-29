import React from 'react';

import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css'
const ModalOverlay = (props) => {

    return (
        <section className={styles.container} onClick={props.onClose}>
           {props.children}
        </section>

    );
};

ModalOverlay.propTypes = {
    
    onClose: PropTypes.func.isRequired
};

export default ModalOverlay;