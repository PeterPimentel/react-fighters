import React from 'react'

import styles from './index.module.css'

function Modal({ message, show, handleClose, action }) {
    return (
        show &&
        <div className={styles.modal}>
            <div className={`${styles.modalContent} scaleInCenter`}>
                <span onClick={handleClose} className={styles.close}>&times;</span>
                <p>{message}</p>
                <div className={styles.modalAction}>
                    {action}
                </div>
            </div>
        </div>
    )
}

export default Modal
