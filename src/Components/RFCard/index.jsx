import React, {useState} from 'react';

import Skill from './skill'

import { Image, Label, Icon } from 'semantic-ui-react'

import styles from './index.module.css';

export default function RFCard({ card, attack, myTurn }) {
    const [showSkill, setShowSkill] = useState(false)

    const handleAttack = (skill) => {
        if(card.energy >= skill.cost){
            attack(skill.damage)
        }else{
            console.log("No Energy")
        }
    }
    const handleHover = (card) => {
        if(card.type === "figther")
            setShowSkill(true)
    }

    const handleClick = (card) => {
        if(card.type === "item"){
            console.log("This is a item")
        }
    }

    return (
        <div
            className={styles.cardBox}
            onMouseEnter={()=>handleHover(card)}
            onMouseLeave={()=>setShowSkill(false)}
            onClick = {()=>handleClick(card)}
        >
            {card.type === "figther" &&
                <div className={styles.cardDamage}>{card.damageReceived}</div>
            }
            {showSkill && card.skills.map(skill =>
                <Skill className={styles.skill} key={skill.id} skill={skill} handleAttack={handleAttack} myTurn={myTurn}/>
            )}
            <Image src={card.image} size='small' />
            {card.type === "figther" &&
                <Label circular color="orange"><Icon name='sun' />{card.energy}</Label>
            }
        </div>
    )
}
