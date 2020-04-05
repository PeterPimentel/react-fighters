import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrag, useDrop } from "react-dnd"

import { handleDrop } from '../../redux/reducers/gameReducer'

import CardInfo from './cardInfo'

import { Header, Container, Box } from './styles'

import styles from './index.module.css'

export default function Card({ card, className, onAttack }) {
    const dispatch = useDispatch()

    const opponent = useSelector(state => state.opponent)

    const ref = useRef(null)

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: card.type || "default", card: card },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const [, dropRef] = useDrop({
        accept: ['item', 'energy'],
        drop(item) {
            if (item.type === card.type) {
                return
            }
            const type = item.type
            dispatch(handleDrop({ type: type, to: opponent.socketId }, item.card, card))
            return
        }
    })

    dragRef(dropRef(ref))

    return (
        <Container isDragging={isDragging} ref={ref} className={`${className}`}>
            <Box>
                <Header>
                    <div>{card.name}</div>
                    <div>
                        <span>HP</span>
                        <span>{card.life}</span>
                    </div>
                </Header>
                <div className={styles.image}>
                    <img alt="card" src={card.image} />
                </div>
                <CardInfo card={card} onAttack={onAttack} />
            </Box>
        </Container>
    )
}
