import React from 'react';
// import { Droppable, Draggable } from "react-beautiful-dnd";

import styles from './index.module.css'

export default function Ring({ reserveCards }) {

    return (
        <div className={styles.reserve}>
            {/* <Droppable droppableId="reserve">
                {(provided) => (
                    <div
                        className={styles.reserveContainer}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {
                            reserveCards.map(card => (
                                <Droppable key={card.id} droppableId="reserveFigther">
                                    {
                                        (provided) => (
                                            <div
                                                className={styles.figtherOnReserve}
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                <img alt="lutador" src={card.image} />
                                                <div>
                                                    <img
                                                        alt="energy logo"
                                                        src="https://www.pngkit.com/png/full/353-3532588_pokemon-fighting-type-symbol-pokemon-card-fighting-energy.png"
                                                    />
                                                    <span>{card.energy}</span>
                                                </div>
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }
                                </Droppable>
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable> */}








            {/* <Droppable droppableId="reserve">
                {(provided, ) => (
                    <div
                        className={styles.reserveContainer}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {
                            reserveCards.map(card => (
                                <div key={card.id} className={styles.figtherOnReserve}>
                                    <img alt="lutador" src={card.image} />
                                    <div>
                                        <img
                                            alt="energy logo"
                                            src="https://www.pngkit.com/png/full/353-3532588_pokemon-fighting-type-symbol-pokemon-card-fighting-energy.png"
                                        />
                                        <span>{card.energy}</span>
                                    </div>
                                </div>
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable> */}

                    <div
                        className={styles.reserveContainer}
                    >
                        {
                            reserveCards.map(card => (
                                <div key={card.id} className={styles.figtherOnReserve}>
                                    <img alt="lutador" src={card.image} />
                                    <div>
                                        <img
                                            alt="energy logo"
                                            src="https://www.pngkit.com/png/full/353-3532588_pokemon-fighting-type-symbol-pokemon-card-fighting-energy.png"
                                        />
                                        <span>{card.energy}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
        </div>
    );
}
