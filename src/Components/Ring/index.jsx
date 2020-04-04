import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { DragDropContext, Droppable } from "react-beautiful-dnd"

import Card from '../Card'
import Reserve from './reserve'
import Hand from './hand'
import Header from './header'
import Modal from '../modal'

import { TurnContext } from "../../context/gameContext"

import { setFighter, setOpponentFighter } from '../../redux/reducers/gameReducer'
import { drawCard } from '../../redux/reducers/deckReducer'


import { action as eventAction, onAction, removeAllListeners } from '../../service/events'

import {
    findCardById, removeFromHand,
    triggerAction
} from '../../service/gameService'

import { index as cardIndex } from '../../service/cardService'

import styles from './index.module.css'

const ACTIONS_INITIAL_STATE = {
    energy: false,
    attack: false,
    equipment: false,
    reserve: false
}

const DROPPABLE_ARES = {
    FIGHTER: 'fighter',
    RESERVE: 'reserve',
    RESERVE_FIGTHER: 'reserveFigther',
    HAND: 'hand'
}

export default function Ring() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const opponent = useSelector(state => state.opponent)
    const { hand } = useSelector(state => state.deck)
    const { fighter, opponentFighter, reserve, opponentReserve } = useSelector(state => state.game)

    const { turn } = useContext(TurnContext)

    //modal controll
    const [modal, setModal] = useState({ show: false, message: '' })
    //Turn Controll
    const [myTurn, setTurn] = useState(turn)
    //Actions Controll
    const [turnActions, setTurnActions] = useState(ACTIONS_INITIAL_STATE)

    const handleSkipTurn = () => {
        setTurn(false)
        eventAction({ type: 'endTurn' })
    }

    const handleNewTurn = useCallback(
        () => {
            // const result = drawCard(deck, 1)
            dispatch(drawCard(1))
            // setHand([...hand, result.card])
            // setDeck(result.deck)
            setTurn(true)
            setTurnActions(ACTIONS_INITIAL_STATE)
        },
        [dispatch],
    )

    const handleAttack = (skill) => {
        if (turnActions.attack === false) {
            if (skill.cost <= fighter.energy) {
                console.log("SKILL - ", skill)
                eventAction({
                    type: 'attack',
                    value: skill.trigger()
                })
                setOpponentFighter({
                    ...opponentFighter,
                    damageReceived: opponentFighter.damageReceived + skill.damage
                })
                setTurnActions({
                    ...turnActions,
                    attack: true
                })
                setTurn(false)
            } else {
                setModal({ show: true, message: "Insufficient energy on this fighter" })
            }
        } else {
            setModal({ show: true, message: "Only one attack per turn" })
        }
    }

    const memorizedHandleActions = useCallback(
        (action) => {
            switch (action.type) {
                case 'addEnergy':
                    setOpponentFighter({ ...opponentFighter, energy: action.value })
                    break;
                case 'attack':
                    setFighter({
                        ...fighter,
                        damageReceived: fighter.damageReceived + action.value
                    })
                    handleNewTurn()
                    break;
                case 'endTurn':
                    handleNewTurn()
                    break;
                default:
                    break;
            }
        },
        [fighter, handleNewTurn, opponentFighter],
    );

    useEffect(() => {
        onAction(memorizedHandleActions)
        return function cleanup() {
            removeAllListeners()
        }
    }, [memorizedHandleActions])

    return (
        <div>
            <Modal
                show={modal.show} message={modal.message}
                handleClose={() => setModal({ ...modal, show: false })}
            />
            <div className={styles.gameBoard}>
                <Header turn={myTurn} skipTurn={handleSkipTurn} />
                {/* Arena */}
                <div className={styles.ring}>
                    <Card
                        className={styles.figtherOnRing}
                        onAttack={handleAttack}
                        card={fighter}
                        showAttr={true}
                    />

                    <div className={styles.figthersContainer}>
                        <Card className={styles.figtherOnRing} card={opponentFighter} showAttr={true} />
                    </div>
                </div>
                {/* FIM Arena */}
                <div className={styles.deck}>
                    DECk
                </div>
                <Reserve reserveCards={reserve} />
                <Hand hand={hand} />
            </div>
        </div>
    )
}
