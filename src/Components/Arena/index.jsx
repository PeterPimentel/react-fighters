import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import Fighter from './fighter'
import Hand from '../Hand'
import Card from '../Ca'

import { Container, GridArea, FloattingCard } from './styles'

import { handleOpponentAction } from '../../redux/reducers/gameReducer'

import { onAction, removeAllListeners } from '../../service/events'

export default function Arena() {

    const { fighter, opponentFighter } = useSelector(state => state.game)
    const { position, highlighted } = useSelector(state => state.highlight)

    useEffect(() => {
        onAction(handleOpponentAction)
        return () => removeAllListeners()
    }, [])

    return (
        <div>
            <Container>
                <GridArea area="arenaHeader">Header</GridArea>
                <GridArea area="arenaFighter">
                    <Fighter fighter={fighter} />
                </GridArea>
                <GridArea area="arenaOpponent">
                    <Fighter fighter={opponentFighter} flip={true} />
                </GridArea>
            </Container>
            <FloattingCard position={position}>
                <Card card={highlighted} />
            </FloattingCard>
            <Hand />
        </div>
    )
}
