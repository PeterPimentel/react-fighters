import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useDrag, useDrop } from "react-dnd"

import {handleDrop} from '../../redux/reducers/gameReducer'

import CardInfo from './cardInfo'

import styles from './index.module.css'

export default function Card({ card, showAttr, className, onAttack }) {
    const dispatch = useDispatch()
    const ref = useRef(null)
    const [{ isDragging }, dragRef] = useDrag({
        item: { type: card.type, card: card},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const [, dropRef] = useDrop({
        accept: ['item', 'energy'],
        drop(item) {
            if(item.type === card.type){
                return
            }

            dispatch(handleDrop('ab',item.card, card))
            return 
        }
    })

    dragRef(dropRef(ref))

    const dragginClass = isDragging === true ? styles.dragging : ''
    return (
        <div ref={ref} className={`${className}`}>
            {
                showAttr &&
                <div className={styles.damageCounter}>
                    <span>{card.damageReceived}</span>
                </div>
            }
            <div className={`${styles.container} ${dragginClass}`}>
                <div className={styles.box}>
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
