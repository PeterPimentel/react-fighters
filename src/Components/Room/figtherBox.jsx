import React from 'react';

import styles from './index.module.css'

export default function FigtherBox({ fighter, onSelect, selected }) {
    const selectedClass = selected ? styles.figtherBoxSelected : ''
    return (
        <div to="/game" onClick={()=>onSelect(fighter)} className={`${styles.figtherBox} ${selectedClass}`}>
            <img src={fighter.avatar} alt="fighter" />
        </div>
    );
}