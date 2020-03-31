import React, { useState, useContext } from 'react';

import { OpponentContext } from "../../context/opponentContext"
import { UserContext } from "../../context/userContext"

import { Card } from 'semantic-ui-react'

import RFCard from '../RFCard'

import CARDS from '../../data/CARDS'

import {
    action as eventAction
} from '../../service/events'

import styles from './index.module.css'

const ACTIONS_INITIAL_STATE = {
    energy: false,
    attack: false,
    equipment: false,
    itens: 0
}

export default function Ring() {
    const findFigther = (id) => CARDS.find(card => card.id === id)

    const { user } = useContext(UserContext)
    const { opponent, setOpponent } = useContext(OpponentContext)

    const [figther, setFighter] = useState(findFigther(user.figther.id))

    const [myTurn, setTurn] = useState(true)
    const [turnActions, setTurnActions] = useState(ACTIONS_INITIAL_STATE)

    const endTurn = () => {
        setTurn(!myTurn)
        setTurnActions(ACTIONS_INITIAL_STATE)
    }

    const handleAttack = (damage) => {
        if (turnActions.attack === false) {
            setOpponent({
                ...opponent,
                damageReceived: opponent.damageReceived + damage
            })
            setTurnActions({
                ...turnActions,
                attack: true
            })
            endTurn()
            eventAction({
                'name': 'attack',
                'damage': damage
            })
        } else {
            console.log("You already have attacked this Turn")
        }
    }

    const receiveEnergy = () => {
        if (turnActions.energy === false) {
            setFighter({
                ...figther,
                energy: ++figther.energy
            })
            setTurnActions({
                ...turnActions,
                energy: true
            })
        } else {
            console.log("You already have used a energy on this Turn")
        }
    }

    return (
        <div>
            <div>
                <Card.Group centered>
                    <RFCard
                        card={figther}
                        attack={handleAttack}
                        myTurn={myTurn}
                    />
                    <RFCard card={opponent} />
                </Card.Group>
            </div>
            <div>
                <button onClick={receiveEnergy}>Give Energy</button>
            </div>
            <div>
                <button onClick={endTurn}>Pass</button>
            </div>
            {/* <div>
                {
                    CARDS.map(card => <RFCard card={card} key={card.id} />)
                }
            </div> */}
            {/* ################## INICIO DOS TESTES ######################*/}
            <div>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles['card-face']}>
                            <div className={styles['card-label']}>1</div>
                        </div>
                    </div>
                    {/* <div className={styles.card}>
                        <div className={styles['card-face']}>
                            <div className={styles['card-label']}>2</div>
                        </div>
                    </div> */}
                    <img alt="card" className={styles.card} src={CARDS[3].image}/>
                    <div className={styles.card}>
                        <div className={styles['card-face']}>
                            <div className={styles['card-label']}>3</div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles['card-face']}>
                            <div className={styles['card-label']}>4</div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles['card-face']}>
                            <div className={styles['card-label']}>5</div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles['card-face']}>
                            <div className={styles['card-label']}>6</div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles['card-face']}>
                            <div className={styles['card-label']}>7</div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles['card-face']}>
                            <div className={styles['card-label']}>8</div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles['card-face']}>
                            <div className={styles['card-label']}>9</div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles['card-face']}>
                            <div className={styles['card-label']}>10</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ############################################# */}
        </div>
    );
}
