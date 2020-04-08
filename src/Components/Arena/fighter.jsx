import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from "react-dnd"

import { handleDrop, handleUserAction } from '../../redux/reducers/gameReducer'

import { FighterBox, SkillPanel } from './styles'

import {onAction} from "../../service/events"

export default function Fighter({ fighter, flip = false }) {

    const dispatch = useDispatch()

    const opponent = useSelector(state => state.opponent)
    const { opponentFighter, turn } = useSelector(state => state.game)

    const [animation, setAnimation] = useState("")

    const ref = useRef(null)
    const [, dropRef] = useDrop({
        accept: ['supporter', 'energy'],
        drop(item) {
            dispatch(handleDrop({ type: item.type, to: opponent.socketId }, item.card, fighter))
            return {
                id: fighter.id
            }
        }
    })

    dropRef(ref)

    const hp = fighter.life - (fighter.damageReceived || 0)
    const barWidth = Math.ceil((hp/fighter.life) * 100)

    useEffect(() => {
        onAction((data) => {
            if(data.action && data.action.type === "attack"){
                if(flip === false){
                    setTimeout(()=>{setAnimation("wobbleHorBottom")},2000)
                    setTimeout(()=>{setAnimation("")},3000)
                }
            }
        })
    }, [flip])

    const handleClick = (skill) => {
        if (fighter.energy >= skill.cost && flip === false && turn.my === true) {
            dispatch(handleUserAction({
                skill,
                type: 'attack',
                to: opponent.socketId
            }, fighter, opponentFighter))
        }
    }

    return (
        <FighterBox ref={ref} bg={fighter.image} flip={flip} width={barWidth} className={animation}>
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
