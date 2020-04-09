import React, { useRef } from 'react'

import { useDrag } from 'react-dnd'

import { ReserveBox } from './styles'

export default function ReserveFighter({ figther, flip = false }) {

    const ref = useRef(null)

    const [, dragRef] = useDrag({
        item: { type: 'figtherFromReserve', card: figther },
    })

    dragRef(ref)

    return (
        <ReserveBox bg={figther.cardImage} flip={flip} ref={ref}>
            <div />
        </ReserveBox>
    )
}
