import React from 'react';

import styles from './index.module.css';

const FigtherInfo = ({skills}) => {
    return (
        <div className={styles.info}>
            {/* energia | Nome attack | dano */}
            {
                skills.map(skill => 
                    <div key={skill.id} className={styles.attackInfo}>
                        <div className={styles.attackEnergy}>{skill.cost}</div>
                        <div className={styles.attackName}>{skill.name}</div>
                        <div className={styles.attackDamage}>{skill.damage}</div>
                    </div>
                )
            }
        </div>
    )
}

const ItemInfo = () => {

}

export default function CardInfo({card}) {
    return (
        <FigtherInfo skills={card.skills}/>
    );
}
// export default function CardInfo() {
//     return (
//         <div className={styles.info}>
//             {/* energia | Nome attack | dano */}
//             <div className={styles.attackInfo}>
//                 <div className={styles.attackEnergy}>1</div>
//                 <div className={styles.attackName}>Attack 1</div>
//                 <div className={styles.attackDamage}>20</div>
//             </div>
//             {/* energia | Nome attack | dano */}
//             <div className={styles.attackInfo}>
//                 <div className={styles.attackEnergy}>2</div>
//                 <div className={styles.attackName}>Kick</div>
//                 <div className={styles.attackDamage}>40</div>
//             </div>
//             <div className={styles.attackInfo}>
//                 <div className={styles.attackEnergy}>3</div>
//                 <div className={styles.attackName}>High Jump Kick</div>
//                 <div className={styles.attackDamage}>40</div>
//             </div>
//         </div>
//     );
// }
