import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { GridArea, UserInfo, ButtonSkip, HeaderGrid } from './styles'
import { Row, HeaderContainer, Text, SubTitle } from '../../styles/common'

import { handleUserAction } from '../../redux/reducers/gameReducer'

import victory_img from '../../assets/victory.png'

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
        <HeaderContainer>
            <HeaderGrid>
                <GridArea area="arenaHeaderUserInfo">
                    <UserInfo>
                        <div>
                            <Text>{user.username}</Text>
                            <div>
                                {
                                    Array.from({ length: user.victorys }).map((_, idx) =>
                                        <img key={idx} src={victory_img} alt="victorys" />
                                    )
                                }
                            </div>
                        </div>
                    </UserInfo>
                </GridArea>
                <GridArea area="arenaHeaderUserTurn">
                    <Row>
                        {turn.my &&
                            <>
                                <SubTitle fontSize="1.5em">Your turn</SubTitle>
                                <ButtonSkip onClick={handleSkip}>&#11246;</ButtonSkip>
                            </>
                        }
                    </Row>
                </GridArea>
                <GridArea area="arenaHeaderOpponentTurn">
                    <Row>
                        {!turn.my && <SubTitle fontSize="1.5em">Playing</SubTitle>}
                    </Row>
                </GridArea>
                <GridArea area="arenaHeaderOpponentInfo">
                    <UserInfo>
                        <div>
                            <Text>{opponent.username}</Text>
                            <div>
                                {
                                    Array.from({ length: opponent.victorys }).map((_, idx) =>
                                        <img key={idx} src={victory_img} alt="victorys" />
                                    )
                                }
                            </div>
                        </div>
                    </UserInfo>
                </GridArea>
            </HeaderGrid>
        </HeaderContainer>
    )
}
