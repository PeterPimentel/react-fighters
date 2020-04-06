import React from 'react'

import {SkillPanel} from './styles'

export default function skill({skill}) {
    return (
        <SkillPanel>
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
