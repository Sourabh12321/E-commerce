import React from 'react';
import styles from './Css/Modal.module.css'

const Modal = ({ show, onClose, children, title }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
