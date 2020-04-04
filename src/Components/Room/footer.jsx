import React from 'react'

import styles from './index.module.css'

const footer = ({ opponent }) => {
  return (
    <div className={styles.opponentInfo}>
      <p>Opponent</p>
      <p>{opponent.username}</p>
      <p>{`Socket - ${opponent.socketId}`}</p>
      <p>{`Ready - ${opponent.ready}`}</p>
      <div>
        <span>Fighter:</span>
        <span>{opponent.fighter.name}</span>
      </div>
    </div>
  )
}

export default footer
