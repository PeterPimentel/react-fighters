import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from './header'
import Ring from './ring'
import Reserve from './reserve'
import Hand from '../Hand'
import Card from '../Card'

import { Container, GridArea, FloattingCard, Background, OpponentCard } from './styles'
import { Title } from '../../styles/common'

import { handleOpponentAction } from '../../redux/reducers/gameReducer'

import { onAction, removeAllListeners } from '../../service/events'

import { useCardHighlight } from '../../hooks/useCardHighlight'

export default function Arena() {
    const dispatch = useDispatch()
    const { fighter, opponentFighter, reserve, opponentReserve } = useSelector(state => state.game)
    const { showPlayed, playedCard, playedClass } = useSelector(state => state.highlight)

    const [highlighted, setHighlight, hide] = useCardHighlight(window.innerWidth)

    useEffect(() => {
        onAction((data) => dispatch(handleOpponentAction(data)))
        return () => removeAllListeners()
    }, [dispatch])

    return (
        <Background>
            {/* GRID Start */}
            <Container>
                <Header />
                <Reserve area="reserveUser" reserve={reserve} canDrop={true} />
                <GridArea area="arenaUser">
                    <Ring fighter={fighter} />
                </GridArea>
                <GridArea area="arenaOpponent">
                    <Ring fighter={opponentFighter} opponentRing={true} />
                </GridArea>
                <Reserve area="reserverOpponent" reserve={opponentReserve} />
            </Container>
            {/* GRID End */}

            <FloattingCard position={highlighted.position}>
                <Card card={highlighted.card} />
            </FloattingCard>

            <OpponentCard show={showPlayed} className={playedClass}>
                <Card card={playedCard} />
            </OpponentCard>

            <Hand handleMouseEnter={setHighlight} handleMouseLeave={hide} />

            {/* <div>
                <Title fontSize="15vw">Titulo</Title>
            </div> */}
        </Background>
    )
}
