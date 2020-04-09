import React from 'react'
import { useSelector } from 'react-redux'

import Card from '../Card'

import { Container } from './styles'

export default function Hand({ handleMouseEnter, handleMouseLeave }) {

    const { hand } = useSelector(state => state.deck)

    return (
        <Container>
            {
                hand.map(card =>
                    <div key={card.key}
                        onMouseEnter={({ nativeEvent: { screenX } }) => handleMouseEnter(card, screenX)}
                        onMouseLeave={handleMouseLeave}>
                        <Card card={card} />
                    </div>
                )
            }
        </Container>
    )
}
