import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'

import { ReserveArea, ReserveBox } from './styles'

import { handleReseverAction } from '../../redux/reducers/gameReducer'

export default function Reserve({ area, reserve, canDrop=false }) {

    const dispatch = useDispatch()
    const opponent = useSelector(state => state.opponent)
    const { turn } = useSelector(state => state.game)

    const ref = useRef(null)
    const [, dropRef] = useDrop({
        accept: ['fighter'],
        drop(item) {
            if(turn.my && turn.reserve === false){
                dispatch(handleReseverAction(
                    { type: 'reserve', action: 'addFighter', to: opponent.socketId },
                    item.card,
                    reserve
                ))
            }
            return {}
        }
    })

    if(canDrop){
        dropRef(ref)
    }
    const color = canDrop ? '#027ebe' : 'red'
    return (
        <ReserveArea flip={canDrop} area={area} ref={ref} color={color}>
            {
                reserve.map(fig =>
                    <ReserveBox flip={canDrop} key={fig.key} bg={fig.image}>
                        <div>
                            Lutador
                        </div>
                    </ReserveBox>
                )
            }
        </ReserveArea>
    )
}
