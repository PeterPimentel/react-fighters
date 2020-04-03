import joeHigashi from '../assets/fighters/joeHigashi/card.png'
import joeHigashiAvatar from '../assets/fighters/joeHigashi/avatar.png'

import balrog from '../assets/fighters/balrog/card.png'
import balrogAvatar from '../assets/fighters/balrog/avatar.png'

import terryBogard from '../assets/fighters/terryBogard/card.png'
import terryBogardAvatar from '../assets/fighters/terryBogard/avatar.jpg'

import paul from '../assets/fighters/paul/card.png'
import paulAvatar from '../assets/fighters/paul/avatar.jpg'

const CARDS = [
    {
		"id": 1,
		"name": "Joe Higashii",
		"image":joeHigashi,
        "life": 50,
		"damageReceived":0,
		"energy":0,
		"factory":"joe",
		"skills": [
			{
				"id":1,
				"name": "Low Kick",
				"cost": 1,
				"damage": 10,
			},
            {
                "id": 3,
				"name": "Hurricame Upper",
				"cost": 3,
				"damage": 40
            }
		],
		"type":"fighter"
    },
    {
		"id": 2,
		"name": "Balrog",
		"image":balrog,
        "life": 60,
		"damageReceived":0,
		"energy":0,
		"factory":"default",
		"skills": [
			{
				"id":1,
				"name": "Jab",
				"cost": 1,
				"damage": 10
			},
			{
				"id": 2,
				"name": "Upper",
				"cost": 3,
				"damage": 30
			}
		],
		"type":"fighter"
    },
    {
		"id": 3,
		"name": "Terry Bogard",
		"image":terryBogard,
        "life": 50,
		"damageReceived":0,
		"energy":0,
		"skills": [
			{
				"id":1,
				"name": "Crack Shot",
				"cost": 2,
				"damage": 20
			},
			{
				"id": 2,
				"name": "Rising Tackle",
				"cost": 5,
				"damage": 40
			}
		],
		"type":"fighter"
    },
    {
		"id": 4,
		"name": "Fresh Water",
		"image":"https://i.pinimg.com/236x/f9/ae/22/f9ae22494da601fdfafab3d69ff3ed13.jpg",
		"effect": {
			"description": "Reduz em 10 os danos sofridos",
			"use":(fighter) => {
				fighter.damageReceived = fighter.damageReceived >= 10 ? fighter.damageReceived - 10 : 0
				return fighter
			}
		},
		"type":"item"
	},
	{
		"id":5,
		"name":"Punch Energy",
		"image":"https://i.pinimg.com/236x/f2/97/af/f297af1da7041035736a13782bd7b596.jpg",
		"type":"energy"
	},
	{
		"id": 6,
		"name": "Eddy Gordo",
		"image":terryBogard,
        "life": 50,
		"damageReceived":0,
		"energy":0,
		"skills": [
			{
				"id":1,
				"name": "Benção",
				"cost": 2,
				"damage": 10
			},
			{
				"id": 2,
				"name": "Armada",
				"cost": 2,
				"damage": 30
			}
		],
		"type":"fighter"
    },
	{
		"id": 7,
		"name": "Paul Phoenix",
		"image":paul,
        "life": 80,
		"damageReceived":0,
		"energy":0,
		"skills": [
			{
				"id":1,
				"name": "Jab",
				"cost": 1,
				"damage": 5
			},
			{
				"id": 2,
				"name": "Mortar Punch",
				"cost": 6,
				"damage": 200
			}
		],
		"type":"fighter"
    },
]

export const FIGTHERS = [
	{
		...CARDS[0],
		avatar:joeHigashiAvatar
	},
	{
		...CARDS[1],
		avatar:balrogAvatar
	},
	{
		...CARDS[2],
		avatar:terryBogardAvatar
	},
	{
		...CARDS[6],
		avatar:paulAvatar
	},
]

export const TYPES = {
	ITEM:'item',
	ENERGY:'energy',
	FIGTHER:'fighter'
}

export default CARDS
