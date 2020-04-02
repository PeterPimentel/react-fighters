import React, { useState, useContext, useEffect, useCallback } from 'react';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { OpponentContext } from "../../context/opponentContext"
import { UserContext } from "../../context/userContext"

import Card from '../Card'

import CARDS, { TYPES } from '../../data/CARDS'

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
    
    //Cards in hand
    const [hand, setHand] = useState([...CARDS])
    
    //cards que tenho no banco de reservas
    const [reserveCards, setReserveCards] = useState([])

    //modal controll
    const [modal, setModal] = useState({show:false, message:''})
    
    //Turn Controll
    const [myTurn, setTurn] = useState(false)
    
    //Actions Controll
    const [turnActions, setTurnActions] = useState(ACTIONS_INITIAL_STATE)

    const handleNewTurn = () => {
        setTurn(true)
        setTurnActions(ACTIONS_INITIAL_STATE)
    }

    const handleAttack = (skill) => {
        if (turnActions.attack === false) {
            if(skill.cost <= figther.energy){
                eventAction({
                    type:'attack',
                    value: skill.damage
                })
                setOpponentFighter({
                    ...opponentFigther,
                    damageReceived: opponentFigther.damageReceived + skill.damage
                })
                setTurnActions({
                    ...turnActions,
                    attack: true
                })
            }else{
                setModal({show:true, message:"Insufficient energy on this figther"})
            }
        }else{
            setModal({show:true, message:"Only one attack per turn"})
        }
            // endTurn()
            // eventAction({
            //     'name': 'attack',
            //     'damage': damage
            // })
    }

    const receiveEnergy = () => {
        if (turnActions.energy === false) {
            const newEnergyCount = figther.energy
            eventAction({
                type:'addEnergy',
                value: newEnergyCount + 1
            })
            setFighter({ ...figther, energy: ++figther.energy })
            setTurnActions({ ...turnActions, energy: true })
        } else {
            setModal({show:true, message:"You already have set a energy on this Turn"})
        }
    }

    const setFigtherOnReserver = (figther) => {
        if(reserveCards.length <= 6 && turnActions.reserve === false){
            setReserveCards([...reserveCards, figther])
            setHand(removeFromHand(figther.id, hand))
            setTurnActions({ ...turnActions, reserve: true })
        }else{
            setModal({show:true, message:"You already did that"})
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

    // const handleAction = (action) => {
    //     switch (action.type) {
    //         case 'addEnergy':
    //             setOpponentFighter({...opponentFigther, energy:action.newEnergyCount})
    //             break;
    //         default:
    //             break;
    //     }
    // }

    const memorizedHandleActions = useCallback(
        (action) => {
            switch (action.type) {
                case 'addEnergy':
                    setOpponentFighter({...opponentFigther, energy:action.value})
                    break;
                case 'attack':
                    setFighter({
                        ...figther,
                        damageReceived: figther.damageReceived + action.value
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
        [figther, opponentFigther],
    );

    useEffect(() => {
        onAction(memorizedHandleActions)
        return function cleanup() {
            console.log("Cleaning Up")
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
                handleClose={()=>setModal({...modal, show:false})}
            />
            <div className={styles.gameBoard}>
                <Header turn={myTurn}/>
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
