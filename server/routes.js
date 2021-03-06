const {Router} =  require("express")

const fighterService = require("./services/fighterService")
const deckService = require("./services/deckService")
const cardService = require("./services/cardService")
const gameService = require("./services/gameService")
const userService = require("./services/userService")

const router = Router()

router.get("/fighter",fighterService.index)
router.get("/fighter/:id",fighterService.show)

router.get("/card",cardService.index)
router.get("/card/:id",cardService.show)

router.get("/deck",deckService.index)

router.get("/user",userService.index)

router.post("/game/action", gameService.handleAction)

module.exports = router
