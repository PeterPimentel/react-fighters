import React from 'react'

import Ca from '../Ca'
import Card from '../Card'

import {Container} from './styles'

const FighterA = {
    "id": 3,
    "name": "Terry Bogard",
    "image": "http://localhost:8080/static/fighters/balrog_card.png",
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
            "info":"Discard 2 energys attached to Terry Bogard and jump one turn on the next attack turn"
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

const cardB = {
    "id": 10,
    "name": "Energy",
    "image": "https://www.pngkit.com/png/detail/353-3532588_pokemon-fighting-type-symbol-pokemon-card-fighting-energy.png",
    "type": "energy",
    "effect":"addEnergy",
    "info":"Give 1 energy to target fighter",
    "value": 1
}

export default function Hand() {
    return (
        <Container>
            {
                [1,2,3,4,5,6,7].map(el=>
                    <div key={el}>
                        <Ca card={FighterA}/>
                    </div>
                )
            }
        </Container>
    )
}
