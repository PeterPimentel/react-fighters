import React, {useState} from 'react'
import Fighter from './fighter'
import Hand from '../Hand'
import Card from '../Ca'
import { Container, GridArea, FloattingCard } from './styles'

const FighterA = {
    "id": 3,
    "name": "Terry Bogard",
    "image": "http://localhost:8080/static/fighters/terry_card.png",
    "life": 60,
    "energy":0,
    "damageReceived":0,
    "skills": [
        {
            "id": 5,
            "name": "Crack Shot",
            "cost": 2,
            "damage": 20,
            "effect":"regular",
            "info":"Discard 2 energys attached to Terry Bogard and jump one turn on the next attack turn."
        },
        {
            "id": 6,
            "name": "Rising Tackle",
            "cost": 5,
            "damage": 40,
            "effect":"regular",
            "info":"Discard 2 energys attached to Terry Bogard and jump one turn on the next attack turn."
        }
    ],
    "type": "fighter"
}

export default function Arena() {
    const [position, setPosition] = useState(0)
    const [cardView, setCardView] = useState(0)

    const handleMouseEnter = (e, card) => {
        const screenWidth = window.innerWidth
        const mousePosition = e.nativeEvent.screenX

        if(mousePosition + 200 > screenWidth){
            setCardView(card)
            setPosition(screenWidth - 200)
        }else{
            setCardView(card)
            setPosition(mousePosition - 16)
        }
    }

    return (
        <div>
            <Container>
                <GridArea area="arenaHeader">Header</GridArea>
                <GridArea area="arenaFighter">
                    <Fighter fighter={FighterA}/>
                </GridArea>
                <GridArea area="arenaOpponent">
                    <Fighter fighter={FighterA} flip={true}/>
                </GridArea>
            </Container>
            <FloattingCard position={position}>
                <Card card={cardView}/>
            </FloattingCard>
            <Hand
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={()=>setPosition(0)}
            />
        </div>
    )
}
