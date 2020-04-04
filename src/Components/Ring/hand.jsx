import React from 'react'
import { useDrag, useDrop } from "react-dnd"

import Card from '../Card'

import styles from './index.module.css'

export default function Ring({ hand }) {

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: "CARD" },
        collect: monitor => ({
          isDragging: monitor.isDragging()
        })
      })

    return (
        <div className={styles.hand}>
            {
                hand.map((card, index) => (
                    <div ref={dragRef} key={card.key} style={{width:"200px",height:"300px"}}>
                        <Card
                            isDragging={false}
                            className={styles.cardInHand}
                            card={card}
                        />
                    </div>
                ))
            }
        </div>
    );
}
