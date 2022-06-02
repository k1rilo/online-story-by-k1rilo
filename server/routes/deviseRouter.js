const Router = require('express')
const router = new Router()
const deviseController = require('../controllers/deviseController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), deviseController.create)
router.get('/', deviseController.getAll)
router.get('/:id', deviseController.getOne)

module.exports = router