import React, { useRef } from 'react'

import { useDrag } from 'react-dnd'

import { ReserveBox } from './styles'

export default function ReserveFighter({ fighter, flip = false }) {

    const ref = useRef(null)

    const [, dragRef] = useDrag({
        item: { type: 'fighterFromReserve', card: fighter },
    })

    dragRef(ref)

    return (
        <ReserveBox bg={fighter.cardImage} flip={flip} ref={ref}>
            <div />
        </ReserveBox>
    )
}
