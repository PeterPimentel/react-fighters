import React, { useState, useContext } from 'react';

import { OpponentContext } from "../../context/opponentContext"
import { UserContext } from "../../context/userContext"

import Card from '../Card'

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
    const [opponentFigther, setOpponentFighter] = useState(findFigther(opponent.figther.id))

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
        <div className={styles.gameBoard}>
            <div className={styles.matchInfo}>
                matchInfo
            </div>
            {/* Arena */}
            <div className={styles.ring}>
                <div className={styles.figthersContainer}>
                    <Card className={styles.figtherOnRing} card={figther} showAttr={true}/>
                </div>
                <div className={styles.figthersContainer}>
                    <Card className={styles.figtherOnRing} card={opponentFigther} showAttr={true}/>
                </div>
            </div>
            {/* FIM Arena */}
            <div className={styles.deck}>
                deck
            </div>
            <div className={styles.reserve}>
                Reserva
            </div>
            <div className={styles.hand}>
                {
                    CARDS.map(card => <Card className={styles.cardInHand} card={card} key={card.id} />)
                }
            </div>
            {/* <div>
                <button onClick={receiveEnergy}>Give Energy</button>
            </div>
            <div>
                <button onClick={endTurn}>Pass</button>
            </div> */}
        </div>
    );
}
