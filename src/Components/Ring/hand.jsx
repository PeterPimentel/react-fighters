import React from 'react'

import Card from '../Card'

import styles from './index.module.css'

export default function Ring({ hand }) {

    return (
        <div className={styles.hand}>
            {
                hand.map((card, index) => (
                    <Card
                        key={card.key}
                        className={styles.cardInHand}
                        card={card}
                    />
                ))
            }
        </div>
    )
}
