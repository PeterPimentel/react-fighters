import React from 'react';

import styles from './index.module.css'

export default function Room({ figther, onSelect, selected }) {
    const selectedClass = selected ? styles.figtherBoxSelected : ''
    return (
        <div to="/game" onClick={()=>onSelect(figther)} className={`${styles.figtherBox} ${selectedClass}`}>
            <img src={figther.image} alt="figther" />
            <span className={styles.figtherLabel}>{figther.name}</span>
        </div>
    );
}
