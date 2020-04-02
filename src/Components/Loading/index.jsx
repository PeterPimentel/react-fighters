import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import { OpponentContext } from '../../context/opponentContext'

import Loader from '../Loader'

import styles from './index.module.css'

import { onReady, onEnemySelected, removeAllListeners } from '../../service/events'

export default function Loading() {
    const { user } = useContext(UserContext)
    const { opponent, setOpponent } = useContext(OpponentContext)

    useEffect(() => {
        onEnemySelected((data) => setOpponent({...data}))
    }, [setOpponent])

    useEffect(() => {
        onReady(() => setOpponent({ ...opponent, ready: true }))
        return () => {
            removeAllListeners()
        }
    }, [opponent, setOpponent])

    if (user.ready && opponent.ready) {
        return <Redirect to={{ pathname: "/game" }} />
    }

    return (
        <div className={styles.root}>
            <Loader />
            <div className={styles.label}>Loading data...</div>
        </div>
    )
}
