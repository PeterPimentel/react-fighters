import React from 'react'

import Card from '../Card'

const style = {margin:"50px"}

export default function index () {
    return (
        <>
        <div style={style}>
            <Card card={{
        "id": 3,
        "name": "Terry Bogard",
        "image": "http://localhost:8080/static/fighters/terry_card.png",
        "life": 60,
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
                "effect":"regular"
            }
        ],
        "type": "fighter"
    }}/>
        </div>
        <div style={style}>
            <Card card={{
        "id": 3,
        "name": "Terry Bogard",
        "image": "http://localhost:8080/static/fighters/terry_card.png",
        "life": 60,
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
                "effect":"regular"
            }
        ],
        "type": "fighter"
    }}/>
        </div>
        </>
    )
}
