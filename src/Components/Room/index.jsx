import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link } from "react-router-dom";

import { OpponentContext } from "../../context/opponentContext"
import { UserContext } from "../../context/userContext"
import { TurnContext } from "../../context/gameContext"
import { Row } from '../RFCentralized'
import FigtherBox from './figtherBox'
import Footer from './footer'

import styles from './index.module.css'

import {
  join,
  onEnemySelected,
  emitFigtherSelected,
  removeAllListeners,
  ready,
  onReady
} from '../../service/events'

import {
  index as fightersIndex
} from '../../service/fighterService'

export default function Room() {
  const { opponent, setOpponent } = useContext(OpponentContext)
  const { user, setUser } = useContext(UserContext)
  const { setTurn } = useContext(TurnContext)
  
  const [selectedFigther, setSelected] = useState(user)
  const [selectedOpponent, setSelectedOpponent] = useState(opponent)
  const [fighters, setFighters] = useState([])
  
  useEffect(() => {
    async function fectData() {
      const data = await fightersIndex()
      setFighters(data)
    }
    fectData()
  }, [])

  const handleReady = () => {
    if (opponent.ready === false) {
      setTurn(true)
    }
    setUser({ ...selectedFigther, ready: true })
    ready(true)
  }

  const handleEnemyReady = useCallback(
    () => {
      setTurn(false)
      setOpponent({ ...selectedOpponent, ready: true })
    },
    [selectedOpponent, setOpponent, setTurn]
  );

  const handleSelect = (fighter) => {
    const userData = {
      ...user,
      fighter: {
        id: fighter.id,
        name: fighter.name,
        image: fighter.image,
        avatar: fighter.avatar
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
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <hr />
        <hr />
        <h3 className={`${styles.title}`}>CHOOSE YOUR FIGTHER</h3>
        <hr />
      </div>
      <div className={styles.fighter}>
        <span>{selectedFigther.fighter.name}</span>
        <img src={selectedFigther.fighter.image} alt="fighter selecionado" />
      </div>
      <div className={styles.opponent}>
        <span>{selectedOpponent.fighter.name}</span>
        <img src={selectedOpponent.fighter.image} alt="fighter selecionado" />
      </div>
      <Row className={styles.characters}>
        {
          fighters.map(fighter =>
            <FigtherBox
              onSelect={handleSelect}
              key={fighter.id}
              fighter={fighter}
              selected={selectedFigther.fighter.id === fighter.id}
            />
          )
        }
      </Row>
      <div className={styles.footer}>
        <Link className={`${styles.button} ${styles.flashit}`} to="/loading" onClick={handleReady}>READY </Link>
        <Footer selectedOpponent={selectedOpponent} opponent={opponent} />
      </div>
    </div>
  );
}
