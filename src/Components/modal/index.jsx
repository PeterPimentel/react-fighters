import React from 'react'

import styles from './index.module.css'

function Modal({ message, show, handleClose }) {
    return (
        show &&
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span onClick={handleClose} className={styles.close}>&times;</span>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Modal
