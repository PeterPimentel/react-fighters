import cinderaImage from '../assets/cinderace.png'

const CARDS = [
    {
		"id": 1,
		"name": "Joe Higashi",
		"description":"Muay Thai Figther",
		"image":"https://i.pinimg.com/236x/43/e1/c7/43e1c792601aa8630f32a7ba1ca49ed4.jpg",
        "life": 50,
		"damageReceived":0,
		"energy":0,
		"skills": [
			{
				"id":1,
				"name": "Low Kick",
				"cost": 1,
				"damage": 10
			},
            {
                "id": 3,
				"name": "Hurricame Upper",
				"cost": 5,
				"damage": 40
            }
		],
		"type":"figther"
    },
    {
		"id": 2,
		"name": "Balrog",
		"description":"Boxe Figther",
		"image":"https://i.pinimg.com/236x/ab/a6/a1/aba6a1d053dcee0372940c6afff5aca2.jpg",
        "life": 60,
		"damageReceived":0,
		"energy":0,
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
		"type":"figther"
    },
    {
		"id": 3,
		"name": "Eddy Gordo",
		"description":"Capoeira Figther",
		"image":"https://i.pinimg.com/236x/e0/4a/5f/e04a5f1bc92b85c8429b1cd93dcaaa94.jpg",
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
		"type":"figther"
    },
    {
		"id": 4,
		"name": "Fresh Water",
		"image":"https://i.pinimg.com/236x/f9/ae/22/f9ae22494da601fdfafab3d69ff3ed13.jpg",
		"effect": {
			"description": "Reduz em 10 os danos sofridos",
			"use":(figther) => {
				figther.damageReceived = figther.damageReceived >= 10 ? figther.damageReceived - 10 : 0
				return figther
			}
		},
		"type":"item"
	},
	{
		"id":5,
		"name":"Punch Energy",
		"image":"https://i.pinimg.com/236x/f2/97/af/f297af1da7041035736a13782bd7b596.jpg",
		"type":"energy"
	}
]

export const FIGTHERS = [CARDS[0], CARDS[1], CARDS[2]]

export default CARDS
