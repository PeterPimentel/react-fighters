import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { handleDrop } from '../../redux/reducers/gameReducer'

import { FighterBox, SkillPanel } from './styles'

import { onAction } from "../../service/events"

export default function Fighter({ fighter, opponentRing = false }) {

    const dispatch = useDispatch()

    const opponent = useSelector(state => state.opponent)
    const { opponentFighter, turn } = useSelector(state => state.game)

    const [animation, setAnimation] = useState("")

    const life = fighter.life - (fighter.damageReceived || 0)
    const hp = life < 0 ? 0 : life
    const barWidth = fighter.id ? Math.ceil((hp / fighter.life) * 100) : 100

    useEffect(() => {
        onAction((data) => {
            if (data.action && data.action.type === "attack") {
                if (opponentRing === false) {
                    setTimeout(() => { setAnimation("wobbleHorBottom") }, 1600)
                    setTimeout(() => { setAnimation("") }, 2400)
                }
            }
        })
    }, [opponentRing])

    const handleClick = (skill) => {
        if (fighter.energy >= skill.cost && opponentRing === false && turn.my === true) {
            dispatch(handleDrop({
                skill,
                type: 'attack',
                to: opponent.socketId
            }, fighter, opponentFighter))
        }
    }

    return (
        <FighterBox bg={fighter.image} flip={opponentRing} width={barWidth} className={animation}>
            <div className="status">
                <div className="status-life">
                    <div>
                        <span>{`${hp}/${fighter.life}`}</span>
                    </div>
                </div>
                <div className="status-energy">
                    <img
                        alt="energy logo"
                        src="https://www.pngkit.com/png/full/353-3532588_pokemon-fighting-type-symbol-pokemon-card-fighting-energy.png"
                    />
                    <span>{fighter.energy}</span>
                </div>
            </div>
            <div className="skill">
                {
                    fighter.skills.map(skill =>
                        <SkillPanel key={skill.id} onClick={() => handleClick(skill)}>
                            <div className="skillName">
                                <div>
                                    <img
                                        alt="energy logo"
                                        src="https://www.pngkit.com/png/full/353-3532588_pokemon-fighting-type-symbol-pokemon-card-fighting-energy.png"
                                    />
                                    <span>{skill.cost}</span>
                                </div>
                                <span>{skill.name}</span>
                                <span>{skill.damage}</span>
                            </div>
                            <div className="skillInfo">{skill.info}</div>
                        </SkillPanel>
                    )
                }
            </div>
        </FighterBox>
    )
}
