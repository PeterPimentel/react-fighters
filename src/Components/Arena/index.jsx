import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from './header'
import Fighter from './fighter'
import Reserve from './reserve'
import Hand from '../Hand'
import Card from '../Ca'

import { Container, GridArea, FloattingCard } from './styles'
import { Title, Row } from '../../styles/common'

import { handleOpponentAction } from '../../redux/reducers/gameReducer'

import { onAction, removeAllListeners } from '../../service/events'

export default function Arena() {
    const dispatch = useDispatch()
    const { fighter, opponentFighter, turn, reserve, opponentReserve } = useSelector(state => state.game)
    const { position, highlighted } = useSelector(state => state.highlight)

    useEffect(() => {
        onAction((data) => dispatch(handleOpponentAction(data)))
        return () => removeAllListeners()
    }, [dispatch])

    return (
        <div>
            <Container>
                <Header />
                <Reserve area="reserveUser" reserve={reserve} canDrop={true} />
                <GridArea area="arenaUser">
                    <Fighter fighter={fighter} />
                </GridArea>
                <GridArea area="arenaOpponent">
                    <Fighter fighter={opponentFighter} flip={true} />
                </GridArea>
                <Reserve area="reserverOpponent" reserve={opponentReserve} />
            </Container>
            <FloattingCard position={position}>
                <Card card={highlighted} />
            </FloattingCard>
            <Hand />
        </div>
    )
}
