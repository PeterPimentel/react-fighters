import React from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from '../Card'

import styles from './index.module.css'

export default function Ring({ hand }) {

    return (
        <div className={styles.hand}>
            <Droppable droppableId="hand">
                {(provided) => (
                    <div
                        style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {
                            hand.map((card, index) => (
                                <Draggable key={card.key} draggableId={`card-${card.id}`} index={index}>
                                    {
                                        (provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Card isDragging={snapshot.isDragging} className={styles.cardInHand} card={card} />
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
    );
}
