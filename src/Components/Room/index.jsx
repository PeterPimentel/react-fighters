import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link } from "react-router-dom";

import { OpponentContext } from "../../context/opponentContext"
import { UserContext } from "../../context/userContext"
import { Row, Column } from '../RFCentralized'
import FigtherBox from './figtherBox'
import Footer from './footer'

import { FIGTHERS } from '../../data/CARDS'
import styles from './index.module.css'

import {
  join,
  onEnemySelected,
  emitFigtherSelected,
  removeAllListeners,
  ready,
  onReady
} from '../../service/events'

export default function Room() {

  const { opponent, setOpponent } = useContext(OpponentContext)
  const { user, setUser } = useContext(UserContext)

  const [selectedFigther, setSelected] = useState(user)
  const [selectedOpponent, setSelectedOpponent] = useState(opponent)

  const handleReady = () => {
    setUser({ ...selectedFigther, ready: true })
    ready(true)
  }

  const handleEnemyReady = useCallback(
    () => {
      setOpponent({ ...selectedOpponent, ready: true })
    },
    [selectedOpponent, setOpponent]
  );

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
    setSelectedOpponent(data)
  }

  useEffect(() => {
    join({ username: user.username })
    return function cleanup() {
      removeAllListeners()
    }
  }, [user.username])

  useEffect(() => {
    onEnemySelected(handleOpponentSelect)
    onReady(handleEnemyReady)
    return function cleanup() {
      removeAllListeners()
    }
  }, [handleEnemyReady])

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
        <Link className={`${styles.button} ${styles.flashit}`} to="/loading" onClick={handleReady}>READY </Link>
      </div>
      <Footer selectedOpponent={selectedOpponent} opponent={opponent} />
    </Column>
  );
}
