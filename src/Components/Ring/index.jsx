import React, { useState, useContext, useEffect, useCallback } from 'react';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { OpponentContext } from "../../context/opponentContext"
import { UserContext } from "../../context/userContext"
import { TurnContext } from "../../context/gameContext"

import Card from '../Card'

import CARDS, { TYPES } from '../../data/CARDS'
import { DECK } from '../../data/DECK'

import Reserve from './reserve'
import Hand from './hand'
import Header from './header'

import Modal from '../modal'

import {
    action as eventAction,
    onAction,
    removeAllListeners
} from '../../service/events'

import {
    findCardById,
    removeFromHand,
    drawCard,
    drawHand
} from '../../service/game'

import {
    findCard
} from '../../service/cardService'

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

    const { user } = useContext(UserContext)
    const { opponent } = useContext(OpponentContext)
    const { turn } = useContext(TurnContext)

    const [fighter, setFighter] = useState(findCard(user.fighter.id))
    
    const [opponentFigther, setOpponentFighter] = useState(findCard(opponent.fighter.id))

    //Deck
    const [deck, setDeck] = useState(DECK)

    //Cards in hand
    const [hand, setHand] = useState(drawHand(DECK))

    //cards que tenho no banco de reservas
    const [reserveCards, setReserveCards] = useState([])

    //modal controll
    const [modal, setModal] = useState({ show: false, message: '' })

    //Turn Controll
    const [myTurn, setTurn] = useState(turn)

    //Actions Controll
    const [turnActions, setTurnActions] = useState(ACTIONS_INITIAL_STATE)

    const handleSkipTurn = () => {
        setTurn(false)
        eventAction({ type: 'endTurn'})
    }

    const handleNewTurn =  useCallback(
        () => {
        const result = drawCard(deck)
        setHand([...hand, result.card])
        setDeck(result.deck)
        setTurn(true)
        setTurnActions(ACTIONS_INITIAL_STATE)
        },
        [deck, hand],
    )

    const handleAttack = (skill) => {
        if (turnActions.attack === false) {
            if (skill.cost <= fighter.energy) {
                console.log("SKILL - ",skill)
                // eventAction({
                //     type: 'attack',
                //     value: skill.trigger()
                // })
                // setOpponentFighter({
                //     ...opponentFigther,
                //     damageReceived: opponentFigther.damageReceived + skill.damage
                // })
                // setTurnActions({
                //     ...turnActions,
                //     attack: true
                // })
                // setTurn(false)
            } else {
                setModal({ show: true, message: "Insufficient energy on this fighter" })
            }
        } else {
            setModal({ show: true, message: "Only one attack per turn" })
        }
    }

    const receiveEnergy = () => {
        if (turnActions.energy === false) {
            const newEnergyCount = fighter.energy
            eventAction({
                type: 'addEnergy',
                value: newEnergyCount + 1
            })
            setFighter({ ...fighter, energy: ++fighter.energy })
            setTurnActions({ ...turnActions, energy: true })
        } else {
            setModal({ show: true, message: "You already have set a energy on this Turn" })
        }
    }

    const setFigtherOnReserver = (fighter) => {
        if (reserveCards.length <= 6 && turnActions.reserve === false) {
            setReserveCards([...reserveCards, fighter])
            setHand(removeFromHand(fighter.id, hand))
            setTurnActions({ ...turnActions, reserve: true })
        } else {
            setModal({ show: true, message: "You already did that" })
        }
    }

    const handleReserveFighterDragEnd = (result) => {
        const idx = result.draggableId.indexOf("_")
        const id = result.draggableId.substring(idx+1)
        const card = findCard(Number(id))
        switch (card.type) {
            // case TYPES.ENERGY:
            //     receiveEnergy()
            //     break;
            case TYPES.FIGTHER:
                setFigtherOnReserver(card)
                break;
            default:
                break;
        }
    }

    const handleFighterDragEnd = (result) => {
        const idx = result.draggableId.indexOf("_")
        const id = Number(result.draggableId.substring(idx+1))
        const card = findCard(id)
        if (card.type === TYPES.ENERGY) {
            receiveEnergy()
            setHand(removeFromHand(id, hand))
        }
    }

    const handleReserveDragEnd = (result) => {
        const idx = result.draggableId.indexOf("_")
        const id = result.draggableId.substring(idx+1)
        const card = findCard(Number(id))
        switch (card.type) {
            case TYPES.ENERGY:
                receiveEnergy()
                break;
            case TYPES.FIGTHER:
                setFigtherOnReserver(card)
                break;
            default:
                break;
        }
    }

    const memorizedHandleActions = useCallback(
        (action) => {
            switch (action.type) {
                case 'addEnergy':
                    setOpponentFighter({ ...opponentFigther, energy: action.value })
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
        [fighter, handleNewTurn, opponentFigther],
    );

    useEffect(() => {
        onAction(memorizedHandleActions)
        return function cleanup() {
            removeAllListeners()
        }
    }, [memorizedHandleActions])

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        switch (result.destination.droppableId) {
            case DROPPABLE_ARES.FIGHTER:
                handleFighterDragEnd(result)
                break;
            case DROPPABLE_ARES.RESERVE:
                handleReserveDragEnd(result)
                break;
            case DROPPABLE_ARES.RESERVE_FIGTHER:
                handleReserveFighterDragEnd(result)
                break;
            default:
                break;
        }
        console.log("RESULT", result)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Modal
                show={modal.show} message={modal.message}
                handleClose={() => setModal({ ...modal, show: false })}
            />
            <div className={styles.gameBoard}>
                <Header turn={myTurn} skipTurn={handleSkipTurn} />
                {/* Arena */}
                <div className={styles.ring}>
                    <Droppable droppableId="fighter">
                        {(provided, ) => (
                            <div className={styles.figthersContainer}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <Card
                                    className={styles.figtherOnRing}
                                    onAttack={handleAttack}
                                    card={fighter}
                                    showAttr={true}
                                />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <div className={styles.figthersContainer}>
                        <Card className={styles.figtherOnRing} card={opponentFigther} showAttr={true} />
                    </div>
                </div>
                {/* FIM Arena */}
                <div className={styles.deck}>
                    DECk
                </div>
                <Reserve reserveCards={reserveCards} />
                <Hand hand={hand} />
            </div>
        </DragDropContext>
    );
}
