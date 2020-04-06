import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Card from '../Ca'

import { Container } from './styles'

import { setHighlight, hideHighlighted } from '../../redux/reducers/highlightReducer'

export default function Hand() {
    const dispatch = useDispatch()
    const { hand } = useSelector(state => state.deck)

    const handleMouse = (e, card) => {
        dispatch(setHighlight(card,e.nativeEvent.screenX,window.innerWidth ))
    }

    const handleMouseLeave = (e) => {
        dispatch(hideHighlighted())
    }

    return (
        <Container>
            {
                hand.map(card =>
                    <div key={card.key}
                        onMouseEnter={(e) => handleMouse(e, card)}
                        onMouseLeave={(e)=>handleMouseLeave(e)}>
                        <Card card={card} />
                    </div>
                )
            }
        </Container>
    )
}
