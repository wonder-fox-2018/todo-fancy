const router = require('express').Router()
const { add, show, showImportance, showSorted, showToday, edit, complete, remove} = require('../controllers/listController')
const { isLogin } = require('../middlewares/isLogin')

router.post('/add', isLogin, add)
router.get('/show', isLogin, show)
router.get('/show/importance/:dir/:state', isLogin, showImportance)
router.get('/show/:sort/:dir/:state', isLogin, showSorted)
router.get('/show/today', isLogin, showToday)
router.put('/:id', isLogin, edit)
router.put('/complete/:name', isLogin, complete)
router.delete('/:name', isLogin, remove)

module.exports = router