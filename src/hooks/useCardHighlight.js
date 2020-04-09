import { useState } from 'react'

function getTruePosition(mouse, width) {
    if (mouse + 200 > width) {
        return width - 200
    } else {
        return mouse - 16
    }
}

export function useCardHighlight(screen = window) {
    const [highlight, setHighlight] = useState({})
    const [position, setPosition] = useState(0)

    const hide = () => setPosition(0)

    const setCardHighlight = (card, mouse) => {
        setHighlight(card)
        setPosition(getTruePosition(mouse, screen))
    }
    return [highlight, position, setCardHighlight, hide];
}
