const Router = require('express')
const router = new Router()
const deviseRouter = require('./deviseRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')



router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/devise', deviseRouter)

module.exports = router