import React from 'react'

import styles from './index.module.css'

const Header = ({turn}) => {
    return (
        <div className={styles.matchInfo}>
            <div>
                {turn ? 'Sua vez' : 'Turno do Opponent'}
            </div>
        </div>
    )
}

export default Header
