import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from './header'
import Fighter from './fighter'
import Reserve from './reserve'
import Hand from '../Hand'
import Card from '../Card'

import { Container, GridArea, FloattingCard, Background, OpponentCard, EmptyFighterBox } from './styles'

import { handleOpponentAction } from '../../redux/reducers/gameReducer'

import { onAction, removeAllListeners } from '../../service/events'

import  "../../styles/animation.css"

export default function Arena() {
    const dispatch = useDispatch()
    const { fighter, opponentFighter, reserve, opponentReserve } = useSelector(state => state.game)
    const { position, highlighted, showPlayed, playedCard, playedClass } = useSelector(state => state.highlight)

    useEffect(() => {
        onAction((data) => dispatch(handleOpponentAction(data)))
        return () => removeAllListeners()
    }, [dispatch])

    return (
        <Background>
            <Container>
                <Header />
                <Reserve area="reserveUser" reserve={reserve} canDrop={true} />
                <GridArea area="arenaUser">
                    {fighter.id ?
                        <Fighter fighter={fighter} /> :
                        <EmptyFighterBox><div></div></EmptyFighterBox>
                    }
                </GridArea>
                <GridArea area="arenaOpponent">
                    {opponentFighter.id ?
                        <Fighter fighter={opponentFighter} flip={true} /> :
                        <EmptyFighterBox><div></div></EmptyFighterBox>
                    }
                </GridArea>
                <Reserve area="reserverOpponent" reserve={opponentReserve} />
            </Container>
            <FloattingCard position={position}>
                <Card card={highlighted} />
            </FloattingCard>
            <OpponentCard show={showPlayed} className={playedClass}>
                <Card card={playedCard} />
            </OpponentCard>
            <Hand />
        </Background>
    )
}
