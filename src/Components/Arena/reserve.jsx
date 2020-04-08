import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'

import ReserveFighter from './reserveFighter'

import { ReserveArea } from './styles'

import { handleDrop } from '../../redux/reducers/gameReducer'

export default function Reserve({ area, reserve, canDrop = false }) {

    const dispatch = useDispatch()
    const opponent = useSelector(state => state.opponent)
    const { turn } = useSelector(state => state.game)

    const ref = useRef(null)

    const [, dropRef] = useDrop({
        accept: ['fighter'],
        drop(item) {
            if (turn.my && turn.reserve === false) {
                dispatch(handleDrop(
                    { type: 'reserve', action: 'addFighter', to: opponent.socketId },
                    item.card,
                    reserve
                ))
            }
            return {}
        }
    })

    if (canDrop) {
        dropRef(ref)
    }

    const color = canDrop ? '#027ebe' : 'red'
    return (
        <ReserveArea flip={canDrop} area={area} ref={ref} color={color}>
            {
                reserve.map(fig =>
                    <ReserveFighter
                        key={fig.key}
                        flip={canDrop}
                        figther={fig}
                    />
                )
            }
        </ReserveArea>
    )
}
