import React from 'react'
import Fighter from './fighter'
import Hand from '../Hand'
import { Container, GridArea } from './styles'

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
    return (
        <div>
            {/* <Container>
                <GridArea area="arenaHeader">Header</GridArea>
                <GridArea area="arenaFighter">
                    <Fighter fighter={FighterA}/>
                </GridArea>
                <GridArea area="arenaOpponent">
                    <Fighter fighter={FighterA} flip={true}/>
                </GridArea>
            </Container> */}
            <Hand/>
        </div>
    )
}
