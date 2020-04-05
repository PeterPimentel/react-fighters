import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { handleUserAction } from '../../redux/reducers/gameReducer'

import Card from '../Card'

import { Damage, Energy, Perspective, FighterOnArena } from './styles'
import { Column } from '../../styles/flex'

export default function Arena() {
    const dispatch = useDispatch()
    const opponent = useSelector(state => state.opponent)
    const { fighter, opponentFighter, turn } = useSelector(state => state.game)

    const [show, setShow] = useState(false)

    const handleAttack = (skill) => {
        if (fighter.energy >= skill.cost && turn.my) {
            dispatch(handleUserAction({
                skill,
                type: 'attack',
                to: opponent.socketId
            }, fighter, opponentFighter))
        }
    }

    return (
        <Perspective>
            <FighterOnArena>
                <Card card={opponentFighter} />
                <Column>
                    <Damage damage={opponentFighter.damageReceived}>{opponentFighter.damageReceived}</Damage>
                    <Energy>{opponentFighter.energy}</Energy>
                </Column>
            </FighterOnArena>
            <FighterOnArena>
                <Card card={fighter} onAttack={handleAttack} />
                <Column>
                    <Damage damage={fighter.damageReceived}>{fighter.damageReceived}</Damage>
                    <Energy>{fighter.energy}</Energy>
                </Column>
            </FighterOnArena>
        </Perspective>
    )
}
