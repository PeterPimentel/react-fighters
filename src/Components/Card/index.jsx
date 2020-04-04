import React from 'react';

import CardInfo from './cardInfo'

import styles from './index.module.css';

const DragCard = ({ card, className }) => {
    return (
        <div className={`${className} ${styles.dragCard}`}>
            <img alt="lutador" src={card.image} />
        </div>
    )
}

const DefaultCard = ({ card, showAttr, className, onAttack, }) => {
    return (
        <div className={`${className}`}>
            {
                showAttr &&
                <div className={styles.damageCounter}>
                    <span>{card.damageReceived}</span>
                </div>
            }
            <div className={`${styles.container}`}>
                <div className={styles.box}>
                    {/* Nome Carta | vida */}
                    <div className={styles.name}>{card.name}</div>
                    <div className={styles.life}>
                        <span>HP</span>
                        <span>{card.life}</span>
                    </div>
                    <div className={styles.image}>
                        <img alt="card" src={card.image} />
                    </div>
                    <CardInfo card={card} onAttack={onAttack} />
                </div>
            </div>
            {
                showAttr &&
                <div className={styles.energy}>
                    <img alt="energy logo" src="https://www.pngkit.com/png/full/353-3532588_pokemon-fighting-type-symbol-pokemon-card-fighting-energy.png" />
                    <span>{card.energy}</span>
                </div>
            }
        </div>
    )
}

export default function Card({ card, showAttr, className, onAttack, isDragging }) {
    return isDragging ?
        (
            <DragCard
                card={card}
                className={className}
            />
        )
        :
        (
            <DefaultCard
                card={card}
                showAttr={showAttr}
                className={className}
                onAttack={onAttack}
            />
        )
}
