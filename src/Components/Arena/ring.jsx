import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from "react-dnd"

import Fighter from './fighter'

import { handleUserAction } from '../../redux/reducers/gameReducer'

import { RingContainer, EmptyFighterBox } from './styles'

export default function Ring({ fighter, opponentRing = false }) {

    const dispatch = useDispatch()

    const opponent = useSelector(state => state.opponent)
    const { reserve } = useSelector(state => state.game)

    const ref = useRef(null)
    const [, dropRef] = useDrop({
        accept: ['supporter', 'energy', 'figtherFromReserve'],
        drop(item) {
            const target = item.type === 'figtherFromReserve' ? reserve : fighter
            dispatch(handleUserAction({ type: item.type, to: opponent.socketId }, item.card, target))
            return {
                id: fighter.id
            }
        }
    })

    if (opponentRing === false) {
        dropRef(ref)
    }

    return (
        <RingContainer ref={ref}>
            {
                fighter.id ?
                    <Fighter fighter={fighter} opponentRing={opponentRing} /> :
                    <EmptyFighterBox>
                        <div>
                            Drop a Fighter from your reserve here!
                    </div>
                    </EmptyFighterBox>
            }
        </RingContainer>
    )
}
