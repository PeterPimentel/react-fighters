import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Container, UserContainer, BattleResult } from './styles';
import { Title, SubTitle, Text, Button } from '../../styles/common'

export default function EndBattle() {
    const user = useSelector(state => state.user)
    const opponent = useSelector(state => state.opponent)

    return (
        <Container>
            <Title>Result</Title>
            <Link to="/" className="back-button">
                <Button>Back</Button>
            </Link>
            <BattleResult>
                <UserContainer bg={user.fighter.image}>
                    <SubTitle>{user.victorys >= 3 ? 'YOU WIN':'YOU LOSE'}</SubTitle>
                    <div>
                        <Text>{user.fighter.name}</Text>
                        <div className="user-info">{user.username}</div>
                    </div>
                </UserContainer>
                <UserContainer bg={opponent.fighter.image}>
                    <SubTitle>{opponent.victorys >= 3 ? 'WIN':'LOSE'}</SubTitle>
                    <div>
                        <Text>{opponent.fighter.name}</Text>
                        <div className="user-info opponent">{opponent.username}</div>
                    </div>
                </UserContainer>
            </BattleResult>
        </Container>
    )
}
