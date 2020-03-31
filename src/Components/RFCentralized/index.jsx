import React from 'react';
import styles from './index.module.css'

export function Column({ children, className }) {
    return (
        <div className={`${styles.cmCentralized} ${className}`}>
            {children}
        </div>
    );
}

export function Row({ children, className }) {
    return (
        <div className={`${styles.rowCentralized} ${className}`}>
            {children}
        </div>
    );
}
