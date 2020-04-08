import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrag } from 'react-dnd'

import { ReserveArea, ReserveBox } from './styles'

import { handleReseverAction } from '../../redux/reducers/gameReducer'

export default function Reserve({ figther, reserve, canDrop = false }) {

    const dispatch = useDispatch()

    const ref = useRef(null)

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: 'figtherOnReserve' || "default", card: figther },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    dragRef(ref)
    
    return (
        <ReserveBox flip={canDrop}/>
    )
}
