import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";

import { OpponentContext } from "../../context/opponentContext"
import { UserContext } from "../../context/userContext"
import { Row, Column } from '../RFCentralized'
import FigtherBox from './figtherBox'

import { FIGTHERS } from '../../data/CARDS'
import styles from './index.module.css'

import {
  join,
  onEnemySelected,
  emitFigtherSelected
} from '../../service/events'

export default function Room() {

  const { opponent, setOpponent } = useContext(OpponentContext)
  const { user, setUser } = useContext(UserContext)

  const [selectedFigther, setSelected] = useState(user)
  const [selectedOpponent, setSelectedOpponent] = useState(opponent)

  const handleReady = () => {
    console.log("Joining in match...")
    setUser(selectedFigther)
    setOpponent(selectedOpponent)
    join(selectedFigther)
  }

  const handleSelect = (figther) => {
    const userData = {
      ...user,
      figther: {
        id: figther.id,
        name: figther.name
      }
    }
    setSelected(userData)
    emitFigtherSelected(userData)
  }

  const handleOpponentSelect = (data) => {
    console.log("Recebendo dados do oponente")
    setSelectedOpponent(data)
  }

  useEffect(() => {
    join({ username: user.username })
  }, [user.username])

  useEffect(() => {
    onEnemySelected(handleOpponentSelect)
  }, [])

  return (
    <Column className={styles.container}>
      <h3 className={`${styles.roomTitle}`}>CHOOSE YOUR FIGTHER</h3>
      <Row>
        {
          FIGTHERS.map(figther =>
            <FigtherBox
              onSelect={handleSelect}
              key={figther.id}
              figther={figther}
              selected={selectedFigther.figther.id === figther.id}
            />
          )
        }
      </Row>
      <div>
        <Link className={`${styles.button} ${styles.flashit}`} to="/game" onClick={handleReady}>READY </Link>
      </div>
      <div className={styles.opponentInfo}>
        <p>Opponent</p>
        <p>{selectedOpponent.username}</p>
        <div>
          <span>Figther:</span>
          <span>{selectedOpponent.figther.name}</span>
        </div>
      </div>
    </Column>
  );
}
