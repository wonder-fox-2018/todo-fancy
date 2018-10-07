const router = require('express').Router()
const { add, show, showImportance, showSorted, edit, complete, remove} = require('../controllers/listController')
const { isLogin } = require('../middlewares/isLogin')

router.post('/add', isLogin, add)
router.post('/show', isLogin, show)
router.post('/show/importance/:dir', isLogin, showImportance)
router.post('/show/:sort/:dir', isLogin, showSorted)
router.put('/:name', isLogin, edit)
router.put('/complete/:name', isLogin, complete)
router.delete('/:name', isLogin, remove)

module.exports = router