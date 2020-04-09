import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'

//Actions
import { opponentSelectFighter, opponentReady } from '../../redux/reducers/opponentReducer'
import { setFighter, setOpponentFighter } from '../../redux/reducers/gameReducer'
import { setDeck, drawCard } from '../../redux/reducers/deckReducer'

import { onReady, onEnemySelected, removeAllListeners } from '../../service/events'
import { index as deckIndex } from '../../service/deckService'
import { show as cardShow } from '../../service/cardService'

import { Loader } from '../../styles/common'

import styles from './index.module.css'

export default function Loading() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const opponent = useSelector(state => state.opponent)
    const { deck } = useSelector(state => state.deck)
    const { fighter, opponentFighter } = useSelector(state => state.game)

    useEffect(() => {
        async function fectData() {
            const champ = await cardShow(user.fighter.id)
            const data = await deckIndex()
            dispatch(setFighter(champ))
            dispatch(setDeck(data))
            dispatch(drawCard(5))
        }
        fectData()
    }, [dispatch, user.fighter.id])

    const handleEnemyReady = useCallback(
        async () => {
            const champ = await cardShow(opponent.fighter.id)
            dispatch(setOpponentFighter(champ))
            dispatch(opponentReady(true))
        },
        [dispatch, opponent.fighter.id]
    )

    useEffect(() => {
        onReady(handleEnemyReady)
        onEnemySelected(data => dispatch(opponentSelectFighter(data)))
        return () => removeAllListeners()
    }, [dispatch, handleEnemyReady, opponent])

    if (user.ready && opponent.ready && deck.length > 0 && opponentFighter.id) {
        return <Redirect to={{ pathname: "/arena" }} />
    }

    return (
        <div className={styles.root}>
            <Loader className="easyRotate"/>
            <div className={styles.label}>Loading ...</div>
            {
                deck.length < 0 && <div className={styles.dataFetch}>Fetching deck...</div>
            }
            {
                !fighter.id && <div className={styles.dataFetch}>Fetching data...</div>
            }
        </div>
    )
}
