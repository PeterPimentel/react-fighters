import React from 'react';

import styles from './index.module.css';

const FigtherInfo = ({skills, onAttack}) => {
    const handleAttack = (skill) => {
        if(typeof onAttack === "function" )
            onAttack(skill)
    }

    return (
        <div className={styles.info}>
            {
                skills.map(skill => 
                    <div onClick={()=>handleAttack(skill)} key={skill.id} className={styles.attackInfo}>
                        <div className={styles.attackEnergy}>{skill.cost}</div>
                        <div className={styles.attackName}>{skill.name}</div>
                        <div className={styles.attackDamage}>{skill.damage}</div>
                    </div>
                )
            }
        </div>
    )
}

const ItemInfo = ({effect}) => {
    return (
        <div className={`${styles.info} ${styles.center}`}>
            <div>{effect.description}</div>
        </div>
    )
}

const EnergyInfo = () => {
    return (
        <div className={`${styles.info} ${styles.center}`}>
            <div>Give 1 energy to target fighter</div>
        </div>
    )
}

const Info = ({card, onAttack}) => {
    switch (card.type) {
        case "fighter":
            return <FigtherInfo skills={card.skills} onAttack={onAttack}/>
        case "item":
            return <ItemInfo effect={card.effect}/>
        case "energy":
            return <EnergyInfo/>
        default:
            return <EnergyInfo/>
    }
}


export default function CardInfo({card, onAttack}) {
    return (
        <Info card={card} onAttack={onAttack}/>
    );
}
