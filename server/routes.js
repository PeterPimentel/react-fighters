const {Router} =  require("express")

const fighterService = require("./services/fighterService")

const router = Router()

router.get("/fighters",fighterService.index)
router.get("/fighters/:id",fighterService.show)

module.exports = router
