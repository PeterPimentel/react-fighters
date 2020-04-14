import React, { useRef } from 'react'
import { useDrag } from "react-dnd"

import { Container, Header, Image, Info } from './styles'

import punch_energy from '../../assets/punch_energy.png'

const Skill = ({ data }) => (
    <div>
        <div className="info-skill" key={data.id}>
            <div className="cost">
                <img
                    alt="energy logo"
                    src={punch_energy}
                />
                <span>{data.cost}</span>
            </div>
            <div>{data.name}</div>
            <div>{data.damage}</div>
        </div>
        <p>{data.info}</p>
    </div>
)

const Effect = ({ data }) => (
    <div className="info-effect">
        {data.info}
    </div>
)


export default function Card({ card, hideHighlight }) {

    const ref = useRef(null)

    const infoData = card.type === "fighter" ? card.skills : [{ id: 1, info: card.info }]
    const InfoComponent = card.type === "fighter" ? Skill : Effect

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: card.type || "default", card: card },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
        begin() {
            if(typeof hideHighlight === "function")
                hideHighlight()
        }
    })

    dragRef(ref)

    return (
        <Container ref={ref} isDragging={isDragging}>
            <Header>
                <div>{card.name}</div>
                <div>
                    <span>HP</span>
                    <span>{card.life}</span>
                </div>
            </Header>
            <Image image={card.cardImage} />
            <Info>
                {
                    infoData.map(data => <InfoComponent key={data.id} data={data} />)
                }
            </Info>
        </Container>
    )
}
