const router = require('express').Router()
const { add, show, showImportance, showSorted, edit, complete, remove} = require('../controllers/listController')
const { isLogin } = require('../middlewares/isLogin')

router.post('/add', isLogin, add)
router.get('/show', isLogin, show)
router.get('/show/importance/:dir', isLogin, showImportance)
router.get('/show/:sort/:dir', isLogin, showSorted)
router.put('/:name', isLogin, edit)
router.put('/complete/:name', isLogin, complete)
router.delete('/:name', isLogin, remove)

module.exports = router