import React from 'react'

import styles from './index.module.css'

const Header = ({turn, skipTurn}) => {
    return (
        <div className={styles.matchInfo}>
            <div>
                {turn ? 'Sua vez' : 'Turno do Opponent'}
            </div>
            <div>
                <button onClick={skipTurn}>Skip Turn</button>
            </div>
        </div>
    )
}

export default Header
