import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

// import { DragDropContext, Droppable } from "react-beautiful-dnd"

import Card from '../Card'
import Reserve from './reserve'
import Hand from './hand'
import Header from './header'
import Modal from '../modal'

import { setFighter, setOpponentFighter, handleUserAction } from '../../redux/reducers/gameReducer'
import { drawCard } from '../../redux/reducers/deckReducer'


import { action as eventAction, onAction, removeAllListeners } from '../../service/events'

import { index as cardIndex } from '../../service/cardService'

import styles from './index.module.css'

const ACTIONS_INITIAL_STATE = {
    energy: false,
    attack: false,
    equipment: false,
    reserve: false
}


export default function Ring() {

    const dispatch = useDispatch()

    const opponent = useSelector(state => state.opponent)
    const user = useSelector(state => state.user)
    const { hand } = useSelector(state => state.deck)
    const { fighter, opponentFighter, reserve, turn } = useSelector(state => state.game)

    //modal controll
    const [modal, setModal] = useState({ show: false, message: '' })
    //Turn Controll
    const [myTurn, setTurn] = useState(turn.my)
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
        if (fighter.energy >= skill.cost) {
            dispatch(handleUserAction({
                skill,
                type: 'attack',
                to: opponent.socketId
            }, fighter, opponentFighter))
        }
    }

    const memorizedHandleActions = useCallback(
        (data) => {
            console.log("Ação", data)
            switch (data.action.type) {
                case 'energy':
                    dispatch(setOpponentFighter(data.result))
                    break
                case 'attack':
                    dispatch(setOpponentFighter(data.result.origin))
                    dispatch(setFighter(data.result.target))
                    // handleNewTurn()
                    break
                case 'item':
                    // dispatch(setOpponentFighter(data.result.origin))
                    // dispatch(setFighter(data.result.target))
                    // handleNewTurn()
                    break;
                case 'skip':
                    handleNewTurn()
                    break;
                default:
                    break;
            }
        },
        [dispatch, handleNewTurn],
    );

    useEffect(() => {
        onAction(memorizedHandleActions)
        return function cleanup() {
            removeAllListeners()
        }
    }, [memorizedHandleActions])

    if (opponent.ready === false && user.ready === false) {
        return <Redirect to={{ pathname: "/room" }} />
    }


    return (
        <div>
            <Modal
                show={modal.show} message={modal.message}
                handleClose={() => setModal({ ...modal, show: false })}
            />
            <div className={styles.gameBoard}>
                <Header turn={turn.my} skipTurn={handleSkipTurn} />
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
