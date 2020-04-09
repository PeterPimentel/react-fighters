import React from 'react'

import Card from '../Card'

const style = { margin: "50px", display: "flex", justifyContent: "space-evenly" }

export default function index() {
    return (
        <div style={style}>
            <div className="slideInFwdTop" >
                <Card card={{
                    "id": 4,
                    "name": "Paul Phoenix",
                    "image": "http://localhost:8080/static/fighters/paul_card.png",
                    "life": 80,
                    "skills": [
                        {
                            "id": 41,
                            "name": "Jab",
                            "cost": 2,
                            "damage": 10,
                            "effect": "regular"
                        },
                        {
                            "id": 42,
                            "name": "Mortar Punch",
                            "cost": 6,
                            "damage": 200,
                            "effect": "discardEnergy",
                            "value": 4,
                            "info": "Discard 4 energy attached to Paul"
                        }
                    ],
                    "type": "fighter"
                }} />
            </div>
            <div className="wobbleHorBottom">
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
                            "effect": "regular",
                            "info": "Discard 2 energys attached to Terry Bogard and jump one turn on the next attack turn"
                        },
                        {
                            "id": 6,
                            "name": "Rising Tackle",
                            "cost": 5,
                            "damage": 40,
                            "effect": "regular"
                        }
                    ],
                    "type": "fighter"
                }} />
            </div>
            <div>
                <Card card={{
                    "id": 5,
                    "name": "Dee Jay",
                    "image": "http://localhost:8080/static/fighters/deejay_card.jpg",
                    "life": 60,
                    "skills": [
                        {
                            "id": 51,
                            "name": "Knee Shot",
                            "cost": 1,
                            "damage": 10,
                            "effect": "regular"
                        },
                        {
                            "id": 52,
                            "name": "Machinegun Upper",
                            "cost": 3,
                            "damage": 30,
                            "effect": "regular"
                        },
                        {
                            "id": 53,
                            "name": "Sobat Carnival",
                            "cost": 4,
                            "damage": 50,
                            "effect": "regular"
                        }
                    ],
                    "type": "fighter"
                }} />
            </div>
        </div>
    )
}
