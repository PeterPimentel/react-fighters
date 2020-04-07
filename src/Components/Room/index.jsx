import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from "react-router-dom"

import { Row } from '../RFCentralized'
import FigtherBox from './figtherBox'
import Footer from './footer'

import { userReady, userSelectFighter } from '../../redux/reducers/userReducer'
import { opponentSelectFighter, opponentReady } from '../../redux/reducers/opponentReducer'
import { setOpponentFighter, setTurn } from '../../redux/reducers/gameReducer'

import {
  emitJoin, emitFigtherSelected, emitReady,
  onEnemySelected, onReady,
  removeAllListeners
} from '../../service/events'
import { show as cardShow } from '../../service/cardService'
import { index as fightersIndex } from '../../service/fighterService'

import styles from './index.module.css'

const Room = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const opponent = useSelector(state => state.opponent)

  const [fighters, setFighters] = useState([])

  useEffect(() => {
    emitJoin({ username: user.username })
    async function fectData() {
      const data = await fightersIndex()
      setFighters(data)
    }
    fectData()
  }, [user.username])

  const handleReady = () => {
    if (opponent.ready === false) {
      dispatch(setTurn({my:true}))
    }
    dispatch(userReady(true))
    emitReady(true)
  }

  const handleEnemyReady = useCallback(
    async () => {
      dispatch(setTurn({my:false}))
      const champ = await cardShow(opponent.fighter.id)
      dispatch(setOpponentFighter(champ))
      dispatch(opponentReady(true))
    },
    [dispatch, opponent.fighter.id]
  )

  const handleSelect = (fighter) => {
    dispatch(userSelectFighter(fighter))
    emitFigtherSelected({ ...user, fighter })
  }

  const handleOpponentSelect = useCallback(data => dispatch(opponentSelectFighter(data)), [dispatch])

  useEffect(() => {
    onEnemySelected(handleOpponentSelect)
    onReady(handleEnemyReady)
    return () => removeAllListeners()
  }, [handleEnemyReady, handleOpponentSelect])

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <hr />
        <hr />
        <h3 className={`${styles.title}`}>CHOOSE YOUR FIGTHER</h3>
        <hr />
      </div>
      <div className={styles.fighter}>
        <span>{user.fighter.name}</span>
        <img src={user.fighter.image} alt="fighter selecionado" />
      </div>
      <div className={styles.opponent}>
        <span>{opponent.fighter.name}</span>
        <img src={opponent.fighter.image} alt="fighter selecionado" />
      </div>
      <Row className={styles.characters}>
        {
          fighters.map(fighter =>
            <FigtherBox
              key={fighter.id}
              onSelect={handleSelect}
              fighter={fighter}
              selected={user.fighter.id === fighter.id}
            />
          )
        }
      </Row>
      <div className={styles.footer}>
        <Link
          className={`${styles.button} ${styles.flashit}`}
          to="/loading"
          onClick={handleReady}>
          READY
        </Link>
        <Footer opponent={opponent} />
      </div>
    </div>
  )
}

export default Room
