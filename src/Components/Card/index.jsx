import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrag, useDrop } from "react-dnd"

import { handleDrop } from '../../redux/reducers/gameReducer'
import { hideHighlighted } from '../../redux/reducers/highlightReducer'

import CardInfo from './cardInfo'

import { Header, Container, Box } from './styles'

import styles from './index.module.css'

export default function Card({ card, className, onAttack }) {
    const dispatch = useDispatch()

    const opponent = useSelector(state => state.opponent)

    const [hovered, setHovered] = useState(false)
    const [dropped, setDropped] = useState(false)

    const ref = useRef(null)

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: card.type || "default", card: card },
        begin:()=>{
            console.log("Here")
            dispatch(hideHighlighted())
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
        end(item, monitor){
            setHovered(false)
            if(monitor.didDrop()){
                setDropped(true)
            }
        }
    })

    const [, dropRef] = useDrop({
        accept: ['item', 'energy'],
        drop(item) {
            if (item.type === card.type) {
                return
            }
            const type = item.type
            dispatch(handleDrop({ type: type, to: opponent.socketId }, item.card, card))
            return {
                id:card.id
            }
        },
        hover(item, monitor){
            if(item.card.id === card.id){
                return
            }
            if(monitor.canDrop()){
                setHovered(true)
            }
        }
    })

    dragRef(dropRef(ref))
    console.log("RE - rendering")
    return (
        <Container
            hovered={hovered}
            isDragging={isDragging}
            ref={ref}
            className={`${className} ${dropped ? styles.slideOutTop: ''}`}>
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
