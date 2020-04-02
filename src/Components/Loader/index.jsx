import React from 'react'

import styles from './index.module.css'

export default function Loader({className}) {
    return (
        <div className={`${className} ${styles.loader}`}>Loading...</div>
    )
}
