import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from './header'
import Fighter from './fighter'
import Hand from '../Hand'
import Card from '../Ca'

import { Container, GridArea, FloattingCard } from './styles'
import { Title, Row } from '../../styles/common'

import { handleOpponentAction } from '../../redux/reducers/gameReducer'

import { onAction, removeAllListeners } from '../../service/events'

export default function Arena() {
    const dispatch = useDispatch()
    const { fighter, opponentFighter, turn } = useSelector(state => state.game)
    const { position, highlighted } = useSelector(state => state.highlight)

    useEffect(() => {
        onAction((data)=>dispatch(handleOpponentAction(data)))
        return () => removeAllListeners()
    }, [dispatch])

    return (
        <div>
            <Container>
                <Header />
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
