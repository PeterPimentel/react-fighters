import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'

import ReserveFighter from './reserveFighter'

import { ReserveArea } from './styles'

import { handleUserAction } from '../../redux/reducers/gameReducer'

export default function Reserve({ area, reserve, canDrop = false }) {

    const dispatch = useDispatch()
    const opponent = useSelector(state => state.opponent)

    const ref = useRef(null)

    const [, dropRef] = useDrop({
        accept: ['fighter'],
        drop(item) {
            dispatch(handleUserAction(
                { type: 'reserve', action: 'addFighter', to: opponent.socketId },
                item.card,
                reserve
            ))
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
                        fighter={fig}
                    />
                )
            }
        </ReserveArea>
    )
}
