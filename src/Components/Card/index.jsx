import React from 'react';

import CardInfo from './cardInfo'

import styles from './index.module.css';

export default function Card({card, showAttr, className}) {
    return (
        <div className={`${className}`}>
            {
                showAttr &&
                <div className={styles.damageCounter}>
                    <span>{card.damageReceived}</span>
                </div>
            }
            {/* Card container */}
            {/* <div className={`${styles.container} ${styles.shakeHorizontal}`}> */}
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
                    <CardInfo card={card}/>
                    <div className={styles.description}>{card.description}</div>
                </div>
            </div>
            {/* FIM Card container */}
            {
                showAttr &&
                <div className={styles.energy}>
                    <img alt="energy logo" src="https://www.pngkit.com/png/full/353-3532588_pokemon-fighting-type-symbol-pokemon-card-fighting-energy.png"/>
                    <span>{card.energy}</span>
                </div>
            }
        </div>
    );
}
