const router = require('express').Router()
const { add, show, showImportance, showSorted, showToday, edit, complete, remove} = require('../controllers/listController')
const { isLogin } = require('../middlewares/isLogin')

router.post('/', isLogin, add)
router.get('/', isLogin, show)
router.get('/importance/:dir/:state', isLogin, showImportance)
router.get('/:sort/:dir/:state', isLogin, showSorted)
router.get('/today', isLogin, showToday)
router.put('/:id', isLogin, edit)
router.patch('/complete/:id', isLogin, complete)
router.delete('/:id', isLogin, remove)

module.exports = router