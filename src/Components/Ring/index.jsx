import React, { useState, useContext } from 'react';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { OpponentContext } from "../../context/opponentContext"
import { UserContext } from "../../context/userContext"

import Card from '../Card'

import CARDS, { TYPES } from '../../data/CARDS'

import Reserve from './reserve'
import Hand from './hand'

import {
    action as eventAction
} from '../../service/events'

import {
    findCardById,
    removeFromHand
} from '../../service/game'

import styles from './index.module.css'

const ACTIONS_INITIAL_STATE = {
    energy: false,
    attack: false,
    equipment: false,
    reserve: false
}

const DROPPABLE_ARES = {
    FIGHTER: 'figther',
    RESERVE: 'reserve',
    RESERVE_FIGTHER:'reserveFigther',
    HAND: 'hand'
}

export default function Ring() {

    const { user } = useContext(UserContext)
    const { opponent } = useContext(OpponentContext)

    const [figther, setFighter] = useState(
        JSON.parse(JSON.stringify(findCardById(user.figther.id)))
    )
    const [opponentFigther, setOpponentFighter] = useState(
        JSON.parse(JSON.stringify(findCardById(opponent.figther.id)))
    )
    
    //Cards que possuo na mão
    const [hand, setHand] = useState([...CARDS])
    
    // cards que tenho no banco de reservas
    const [reserveCards, setReserveCards] = useState([])

    const [myTurn, setTurn] = useState(true)
    const [turnActions, setTurnActions] = useState(ACTIONS_INITIAL_STATE)

    const endTurn = () => {
        setTurn(!myTurn)
        setTurnActions(ACTIONS_INITIAL_STATE)
    }

    const handleAttack = (damage) => {
        // if (turnActions.attack === false) {
        if (false === false) {
            setOpponentFighter({
                ...opponentFigther,
                damageReceived: opponentFigther.damageReceived + damage
            })
            setTurnActions({
                ...turnActions,
                attack: true
            })
            // endTurn()
            // eventAction({
            //     'name': 'attack',
            //     'damage': damage
            // })
        } else {
            console.log("You already have attacked this Turn")
        }
    }

    const receiveEnergy = () => {
        if (turnActions.energy === false) {
            setFighter({ ...figther, energy: ++figther.energy })
            setTurnActions({ ...turnActions, energy: true })
        } else {
            console.log("You already have used a energy on this Turn")
        }
    }

    const setFigtherOnReserver = (figther) => {
        // if(reserveCards.length <= 6 && turnActions.reserve === false){
        if(reserveCards.length <= 6){
            setReserveCards([...reserveCards, figther])
            setHand(removeFromHand(figther.id, hand))
            setTurnActions({ ...turnActions, reserve: true })
        }else{
            console.log(
                "Maximun figthers on the reserve is six or you already did this action on this turn"
            )
        }
    }

    const handleReserveFighterDragEnd = (result) => {
        const card = findCardById(Number(result.draggableId.charAt(5)))
        switch (card.type) {
            // case TYPES.ENERGY:
            //     receiveEnergy()
            //     break;
            case TYPES.FIGTHER:
                setFigtherOnReserver(card)
                break;
            case TYPES.RESERVE_FIGTHER:
                setFigtherOnReserver(card)
                break;

            default:
                break;
        }
    }

    const handleFighterDragEnd = (result) => {
        const id = Number(result.draggableId.charAt(5))
        const card = findCardById(id)
        if (card.type === TYPES.ENERGY) {
            receiveEnergy()
            setHand(removeFromHand(id, hand))
        }
    }

    const handleReserveDragEnd = (result) => {
        const card = findCardById(Number(result.draggableId.charAt(5)))
        switch (card.type) {
            case TYPES.ENERGY:
                receiveEnergy()
                break;
            case TYPES.FIGTHER:
                setFigtherOnReserver(card)
                break;
            case TYPES.RESERVE_FIGTHER:
                setFigtherOnReserver(card)
                break;

            default:
                break;
        }
    }

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

            <div className={styles.gameBoard}>
                <div className={styles.matchInfo}>
                    matchInfo
                </div>
                {/* Arena */}
                <div className={styles.ring}>
                    <Droppable droppableId="figther">
                        {(provided, ) => (
                            <div className={styles.figthersContainer}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <Card
                                    className={styles.figtherOnRing}
                                    onAttack={handleAttack}
                                    card={figther}
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
                <Reserve reserveCards={reserveCards}/>
                <Hand hand={hand} />
            </div>
        </DragDropContext>
    );
}
