const FIGHTERS = require("../data/fighters.json")

const index = (req, res) => {
    res.json(FIGHTERS)
}

const show = (req, res) => {
    const fighter = FIGHTERS.filter(fig => fig.id === Number(req.params.id))

    res.json(fighter[0])
}

module.exports = {
    index,
    show
}