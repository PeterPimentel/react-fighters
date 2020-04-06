import React from 'react'

import Skill from './skill'
import { FighterBox } from './styles'

export default function fighter({fighter, flip}) {
    const hp = fighter.life - (fighter.damageReceived || 0 )
    return (
        <FighterBox bg={fighter.image} flip={flip}>
            <div className="status">
                <div className="status-life">
                    <span>{`HP- ${hp}/${fighter.life}`}</span>
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
                        <Skill key={skill.id} skill={skill} />
                    )
                }
            </div>
        </FighterBox>
    )
}
