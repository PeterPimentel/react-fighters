const CARDS = require("../data/cards.json")

const _find = (id) => CARDS.filter(fig => fig.id === Number(id))

const _findAll = () => CARDS

const index = (req, res) => {
    res.json(_findAll())
}

const show = (req, res) => {
    const card = _find(req.params.id)
    res.json(card[0])
}


module.exports = {
    index,
    show,
    _find,
    _findAll
}