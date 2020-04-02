import React from 'react'

import styles from './index.module.css'

const footer = ({selectedOpponent, opponent }) => {
    return (
        <div className={styles.opponentInfo}>
        <p>Opponent</p>
        <p>{selectedOpponent.username}</p>
        <p>{`Ready - ${opponent.ready}`}</p>
        <div>
          <span>Fighter:</span>
          <span>{selectedOpponent.fighter.name}</span>
        </div>
      </div>
    )
}

export default footer
