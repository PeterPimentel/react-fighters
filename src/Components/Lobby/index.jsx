import React, { useEffect, useState, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Title, Row } from '../../styles/common'
import { UserItem, UserList, Container, ChallengeBox } from './styles'

import {
    subscribeToUsersList,
    emitJoin,
    emitChallenge,
    emitChallengeResponse,
    subscribeToMatchs,
    subscribeToChallengeResponse
} from '../../service/events'

import { index as userIndex } from '../../service/userService'

import { setOpponent } from '../../redux/reducers/opponentReducer'

export default function Lobby() {

    const [onlineUsers, setOnlineUsers] = useState([])
    const [show, setShow] = useState(false)
    const [matchFind, setMatch] = useState(false)
    const [currentOpponent, setCurrentOpponent] = useState({})

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleChallenge = (data) => {
        setShow(true)
        setCurrentOpponent(data.user)
    }


    const handleChallengeResponse = useCallback((response) => {
        dispatch(setOpponent(response.from))
        setMatch(true)
    }, [dispatch])

    const sendChallengeResponse = (response) => {
        setShow(false)
        emitChallengeResponse({
            response,
            to: currentOpponent,
            from: {
                username: user.username
            }
        })
        dispatch(setOpponent(currentOpponent))
        setMatch(true)
    }

    useEffect(() => {
        emitJoin({ username: user.username })
        subscribeToMatchs(handleChallenge)
        subscribeToChallengeResponse(handleChallengeResponse)
        subscribeToUsersList((data) => {
            setOnlineUsers(prevState => prevState.concat(data))
        })
        async function fectData() {
            const data = await userIndex()
            const onlineUsers = data.filter(u => u.username !== user.username)
            setOnlineUsers(onlineUsers)
        }
        fectData()
    }, [handleChallengeResponse, user.username])

    const handleSubmitChallenger = (selectedOpponent) => {
        emitChallenge({
            user: {
                username: user.username
            },
            opponent: selectedOpponent
        })
    }

    if (matchFind) {
        return <Redirect to={{ pathname: "/room" }} />
    }

    return (
        <Container>
            <Title>Select your opponent</Title>
            <Row className="user-list">
                <UserList>
                    {
                        onlineUsers.map(onUser => (
                            <UserItem key={onUser.socketId} onClick={() => handleSubmitChallenger(onUser)}>
                                <span>{onUser.username}</span>
                                <span>STANDBY</span>
                                <button>&#9876;</button>
                            </UserItem>
                        ))
                    }
                </UserList>
                {
                    show &&
                    <ChallengeBox>
                        <div>Challenge Received from {currentOpponent.username}</div>
                        <div className="challenge-options">
                            <button onClick={() => sendChallengeResponse(true)}>Accept</button>
                            <button onClick={() => sendChallengeResponse(false)}>Decline</button>
                        </div>
                    </ChallengeBox>
                }
            </Row>
        </Container>
    )
}
