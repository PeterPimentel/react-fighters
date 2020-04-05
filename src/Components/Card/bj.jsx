// import React, { useRef, useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useDrag, useDrop } from "react-dnd"

// import { handleDrop } from '../../redux/reducers/gameReducer'

// import CardInfo from './cardInfo'
// import { Header, Container } from './styles'

// import styles from './index.module.css'

// export default function Card({ card, className, onAttack, widthX, heigthY }) {
//     const dispatch = useDispatch()

//     const opponent = useSelector(state => state.opponent)

//     const [width, setWidth] = useState(150)

//     const ref = useRef(null)
//     const boxRef = useRef(null)

//     const [{ isDragging }, dragRef] = useDrag({
//         item: { type: card.type || "default", card: card },
//         collect: monitor => ({
//             isDragging: monitor.isDragging()
//         })
//     })
//     const [, dropRef] = useDrop({
//         accept: ['item', 'energy'],
//         drop(item) {
//             if (item.type === card.type) {
//                 return
//             }
//             const type = item.type
//             dispatch(handleDrop({ type: type, to: opponent.socketId }, item.card, card))
//             return
//         }
//     })

//     useEffect(() => {
//         setWidth(boxRef.current.offsetWidth)
//     }, [boxRef])

//     dragRef(dropRef(ref))

//     return (
//         <Container isDragging={isDragging} ref={ref} className={`${className}`}>
//             <div className={styles.box} ref={boxRef}>
//                 <Header>
//                     <div>{card.name}</div>
//                     <div>
//                         <span>HP</span>
//                         <span>{card.life}</span>
//                     </div>
//                 </Header>
//                 <div className={styles.image}>
//                     <img alt="card" src={card.image} />
//                 </div>
//                 <CardInfo card={card} onAttack={onAttack} />
//             </div>
//         </Container>
//         // <div ref={ref} className={`${className}`}>
//             {/* {
//                 showAttr &&
//                 <div className={styles.damageCounter}>
//                     <span>{card.damageReceived}</span>
//                 </div>
//             } */}
//             {/* <div className={`${styles.container} ${dragginClass}`}>
//                 <div className={styles.box} ref={boxRef}>
//                     <Header width={width}>
//                         <div>{card.name}</div>
//                         <div className={styles.life}>
//                             <span>HP</span>
//                             <span>{card.life}</span>
//                         </div>
//                     </Header>
//                     <div className={styles.image}>
//                         <img alt="card" src={card.image} />
//                     </div>
//                     <CardInfo card={card} onAttack={onAttack} />
//                 </div>
//             </div> */}
//             {/* {
//                 showAttr &&
//                 <div className={styles.energy}>
//                     <img alt="energy logo" src="https://www.pngkit.com/png/full/353-3532588_pokemon-fighting-type-symbol-pokemon-card-fighting-energy.png" />
//                     <span>{card.energy}</span>
//                 </div>
//             } */}
//         {/* </div> */}
//     )
// }
