import React, { useEffect, useState, useCallback } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Modal from '../modal'

import { Title, Button } from '../../styles/common'
import { Container, MenuItem } from './styles'

import {
    emitJoin,
    emitChallenge,
    emitChallengeResponse,
    subscribeToMatchs,
    subscribeToChallengeResponse
} from '../../service/events'

import { setOpponent } from '../../redux/reducers/opponentReducer'

import audio from '../../assets/sounds/fight.ogg'

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
            <div className="main-title">
                <hr/>
                <hr/>
                <Title>React Fighters</Title>
                <hr/>
            </div>
            <audio
                autoPlay
                loop
                src={audio}>
                    Your browser does not support the
                    <code>audio</code> element.
            </audio>
            <Modal
                show={show}
                handleClose={() => sendResponse(false)}
                action={<ActionButtons />}
            >
                {inviteAccept ? `Waiting for opponent` : `Challenge Received from ${currentOpponent.username}`}
            </Modal>
            <ul>
                <MenuItem onClick={() => handleSubmitChallenger()}>ONLINE VS</MenuItem>
                <Link to="/collection">
                    <MenuItem>CARDS</MenuItem>
                </Link>
            </ul>
        </Container>
    )
}
