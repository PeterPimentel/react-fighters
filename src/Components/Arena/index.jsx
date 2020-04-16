import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Header from './header'
import Ring from './ring'
import Reserve from './reserve'
import Hand from '../Hand'
import Card from '../Card'

import { Container, GridArea, FloattingCard, Background, OpponentCard, ArenaTitleBox, PunchEffect } from './styles'
import { Title } from '../../styles/common'

import { handleOpponentAction } from '../../redux/reducers/gameReducer'

import { onAction, removeAllListeners } from '../../service/events'

import { useCardHighlight } from '../../hooks/useCardHighlight'

export default function Arena() {
    const dispatch = useDispatch()
    const { fighter, opponentFighter, reserve, opponentReserve } = useSelector(state => state.game)
    const { showPlayed, playedCard, playedClass } = useSelector(state => state.highlight)
    const { title } = useSelector(state => state.animation)
    const user = useSelector(state => state.user)
    const opponent = useSelector(state => state.opponent)

    const [highlighted, setHighlight, hide] = useCardHighlight(window.innerWidth)

    useEffect(() => {
        onAction((data) => {
            dispatch(handleOpponentAction(data))
        })
        return () => removeAllListeners()
    }, [dispatch])

    if(user.victorys >= 1 || opponent.victorys >= 1){
        return <Redirect to="/arena/end" />
    }

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

            { title.show &&
                <ArenaTitleBox className={title.animation}>
                    <Title fontSize="15vw">{title.message}</Title>
                </ArenaTitleBox>
            }
        </Background>
    )
}
