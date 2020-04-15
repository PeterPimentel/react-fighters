import React, { useEffect, useState, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Modal from '../modal'

import { Title, Row, Loader, Button } from '../../styles/common'
import { UserItem, UserList, Container, ChallengeBox, MenuItem } from './styles'

import {
    subscribeToUsersList,
    emitJoin,
    emitChallenge,
    emitChallengeResponse,
    subscribeToMatchs,
    subscribeToChallengeResponse
} from '../../service/events'

import { setOpponent } from '../../redux/reducers/opponentReducer'

export default function MainMenu() {

    const [show, setShow] = useState(false)
    const [matchFind, setMatch] = useState(false)
    const [inviteAccept, setInvite] = useState(false)
    const [currentOpponent, setCurrentOpponent] = useState({})

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleChallenge = (data) => {
        setShow(true)
        setCurrentOpponent(data.opponent)
    }

    const handleChallengeResponse = useCallback((data) => {
        if (data.response === true) {
            dispatch(setOpponent(data.from))
            setMatch(true)
        }
    }, [dispatch])

    const sendResponse = (response) => {
        setInvite(response)
        emitChallengeResponse({
            response,
            to: currentOpponent,
            from: {
                username: user.username
            }
        })
        if (response === false) {
            setShow(false)
        }
    }

    useEffect(() => {
        emitJoin({ username: user.username })
        subscribeToMatchs(handleChallenge)
        subscribeToChallengeResponse(handleChallengeResponse)
    }, [handleChallengeResponse, user.username])

    const handleSubmitChallenger = (selectedOpponent) => {
        emitChallenge({
            user: {
                username: user.username
            },
            opponent: selectedOpponent
        })
    }


    const ActionButtons = () => {
        if (inviteAccept) {
            return <></>
        } else {
            return (
                <>
                    <Button onClick={() => sendResponse(true)}>Accept</Button>
                    <Button onClick={() => sendResponse(false)}>Decline</Button>
                </>
            )
        }
    }

    if (matchFind && inviteAccept) {
        return <Redirect to={{ pathname: "/room" }} />
    }

    return (
        <Container>
            <Title>Main Menu</Title>
            <Modal
                show={show}
                handleClose={() => sendResponse(false)}
                action={<ActionButtons />}
            >
                {inviteAccept ? `Waiting for opponent` : `Challenge Received from ${currentOpponent.username}`}
            </Modal>
            <ul>
                <MenuItem onClick={() => handleSubmitChallenger()}>ONLINE VS</MenuItem>
            </ul>
        </Container>
    )
}
