import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { handleUserAction } from '../../redux/reducers/gameReducer'

import { FighterBox, SkillPanel, PunchEffect } from './styles'

import punch_energy from '../../assets/punch_energy.png'

export default function Fighter({ fighter, opponentRing = false }) {

    const dispatch = useDispatch()

    const opponent = useSelector(state => state.opponent)
    const { opponentFighter } = useSelector(state => state.game)
    const { opponentAnimation, userAnimation } = useSelector(state => state.animation)

    const life = fighter.life - (fighter.damageReceived || 0)
    const hp = life < 0 ? 0 : life
    const barWidth = fighter.id ? Math.ceil((hp / fighter.life) * 100) : 100


    const handleClick = (skill) => {
        if (fighter.energy >= skill.cost && opponentRing === false) {
            dispatch(handleUserAction({
                skill,
                type: 'attack',
                to: opponent.socketId
            }, fighter, opponentFighter))
        }
    }

    const animation = opponentRing === false ? userAnimation.name : opponentAnimation.name
    return (
        <FighterBox bg={fighter.image} flip={opponentRing} width={barWidth} className={animation}>
            <div className="status">
                <div className="status-life">
                    <div>
                        <span>{`${hp}/${fighter.life}`}</span>
                    </div>
                </div>
                <div className="status-energy">
                    {
                        Array.from({length:fighter.energy}).map((_,idx) =>
                            <img key={idx} alt="energy logo" src={punch_energy}/>
                        )
                    }
                </div>
            </div>
            <div className="skill">
                <PunchEffect/>
                {
                    fighter.skills.map(skill =>
                        <SkillPanel key={skill.id} onClick={() => handleClick(skill)}>
                            <div className="skillName">
                                <div>
                                    <img
                                        alt="energy logo"
                                        src={punch_energy}
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
