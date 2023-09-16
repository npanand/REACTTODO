const express = require("express");
const router = express.Router();
const { getTodos, createTodo,deleteTodo, updateTodo } = require("../controllers/todoController");
const { protect } = require("../middleware/authMiddleware");

// Protected Route
router.get("/", protect, getTodos);

// Protected Route
router.post("/", protect, createTodo);

// Update Todo
router.put("/", protect,updateTodo);

//delete Todo
router.delete("/:title", protect,deleteTodo);


module.exports = router;
