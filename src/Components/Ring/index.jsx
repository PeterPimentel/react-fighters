import React, { useState, useContext } from 'react';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { OpponentContext } from "../../context/opponentContext"
import { UserContext } from "../../context/userContext"

import Card from '../Card'

import CARDS, {TYPES} from '../../data/CARDS'

import {
    action as eventAction
} from '../../service/events'

import {
    findCardById
} from '../../service/game'

import styles from './index.module.css'

const ACTIONS_INITIAL_STATE = {
    energy: false,
    attack: false,
    equipment: false,
    itens: 0
}

export default function Ring() {

    const { user } = useContext(UserContext)
    const { opponent, setOpponent } = useContext(OpponentContext)

    const [figther, setFighter] = useState(
        JSON.parse(JSON.stringify(findCardById(user.figther.id)))
    )
    const [opponentFigther, setOpponentFighter] = useState(
        JSON.parse(JSON.stringify(findCardById(opponent.figther.id)))
    )

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
        // if (turnActions.energy === false) {
        if (false === false) {
            setFighter({...figther, energy: ++figther.energy })
            setTurnActions({ ...turnActions, energy: true })
        } else {
            console.log("You already have used a energy on this Turn")
        }
    }

    const handleFighterDragEnd = (result) => {
        const card = findCardById(Number(result.draggableId.charAt(5)))
        if(card.type === TYPES.ENERGY){
            receiveEnergy()
        }
    }

    const onDragEnd = (result) => {

        // dropped outside the list
        if (!result.destination) {
            return;
        }
        switch (result.destination.droppableId) {
            case TYPES.FIGTHER:
                handleFighterDragEnd(result)
                break;
            default:
                break;
        }
        //     result.source.index,
        //   result.destination.droppableId
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
                <div className={styles.reserve}>
                    <Droppable droppableId="reserve">
                        {(provided, ) => (
                            <div style={{ background: "red", height: "100%", width: "100%" }}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                <div className={styles.hand}>
                    <Droppable droppableId="hand">
                        {(provided) => (
                            <div
                                style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {
                                    CARDS.map((card, index) => (
                                        <Draggable key={`card-${card.id}`} draggableId={`card-${card.id}`} index={index}>
                                            {
                                                (provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Card className={styles.cardInHand} card={card} />
                                                    </div>
                                                )
                                            }
                                        </Draggable>
                                    ))
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    );
}
