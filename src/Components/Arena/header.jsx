import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { GridArea, UserInfo, ButtonSkip } from './styles'
import { Title, Row } from '../../styles/common'

import { handleUserAction } from '../../redux/reducers/gameReducer'

export default function Header() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const opponent = useSelector(state => state.opponent)
    const { turn } = useSelector(state => state.game)

    const handleSkip = () => {
        if (turn.my) {
            dispatch(handleUserAction({ type: "skip", to: opponent.socketId }))
        }
    }

    return (
        <>
            <GridArea area="arenaHeaderUserInfo">
                <UserInfo>
                    <div>
                        <p>{`Username: ${user.username}`}</p>
                        <p>{`Victorys: ${user.victorys}`}</p>
                    </div>
                </UserInfo>
            </GridArea>
            <GridArea area="arenaHeaderUserTurn">
                <Row>
                    {turn.my &&
                        <>
                            <Title fontSize="1.5em">Your turn</Title>
                            <ButtonSkip onClick={handleSkip}>&#11246;</ButtonSkip>
                        </>
                    }
                </Row>
            </GridArea>
            <GridArea area="arenaHeaderOpponentTurn">
                <Row>
                    {!turn.my && <Title fontSize="1.5em">Playing</Title>}
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
