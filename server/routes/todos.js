const router = require("express").Router()
const todoController = require("../controllers/todoController");
const authentication = require("../middlewares/authentication");

router.use(authentication.checkToken, authentication.checkifTokenValid)
router.use("/:todoId",authentication.checkIfTodoOwnedByUser)

// /api/todos
router
.get("/",todoController.getAllTaskByUserId)
.post("/",todoController.create)
.get("/:todoId",todoController.getOneById)
.patch("/:todoId",todoController.updatebyId)
.delete("/:todoId",todoController.deleteById)


module.exports = router;
