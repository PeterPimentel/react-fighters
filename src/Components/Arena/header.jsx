import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { GridArea, UserInfo } from './styles'
import { Title, Row } from '../../styles/common'

import { handleOpponentAction, skipTurn } from '../../redux/reducers/gameReducer'

import { onAction, removeAllListeners } from '../../service/events'

export default function Header() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const opponent = useSelector(state => state.opponent)
    const { turn } = useSelector(state => state.game)

    return (
        <>
            <GridArea area="arenaHeaderUserInfo">
                <UserInfo>
                    <div>
                        <p>{`Username: ${user.username}`}</p>
                        <p>{`Victorys: ${user.victorys}`}</p>
                    </div>
                    <div>
                        <button onClick={()=> dispatch(skipTurn())}>&#11246;</button>
                    </div>
                </UserInfo>
            </GridArea>
            <GridArea area="arenaHeaderUserTurn">
                <Row>
                    {turn.my && <Title fontSize="1.8em">Your turn</Title>}
                </Row>
            </GridArea>
            <GridArea area="arenaHeaderOpponentTurn">
                <Row>
                    {!turn.my && <Title fontSize="1.8em">Playing</Title>}
                </Row>
            </GridArea>
            <GridArea area="arenaHeaderOpponentInfo">
            <UserInfo>
                    <div>
                        <p>{`Username: ${opponent.username}`}</p>
                        <p>{`Victorys: ${opponent.victorys}`}</p>
                    </div>
                </UserInfo>
            </GridArea>
        </>
    )
}
