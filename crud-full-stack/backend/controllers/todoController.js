const asynchandler = require("express-async-handler");
const Todo = require("../models/todoModel");

const getTodos = asynchandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.status(200).json(todos);
});

const createTodo = asynchandler(async (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: "Please enter all fields" });
  }
  const todo = await Todo.create({
    user: req.user.id,
    title: req.body.title,
    completed: req.body.completed,
  });
  res.status(200).json(todo);
});

const deleteTodo = asynchandler(async (req, res) => {
  if (!req.params.title) {
    res.status(400).json("data field is missed");
  }
  else {
    try {
      const data = await Todo.deleteOne({
        user: req.user.id,
        title: req.params.title
      })
      if (data.deletedCount == 0) {
        res.status(400).send("not data found or already deleted ");
      }
      else {
        res.status(200).send("sucessfully deleted")
      }
    }
    catch {
      res.status(400).json("not deleted");
      console.log("not deleted")
    }
  }
})

const updateTodo = asynchandler(async (req, res) => {
  console.log(req);
  if (!req.body.title) {
    res.status(400).json("data field is missed");
  }
  else {
    try {
      const data = await Todo.updateOne({
        user: req.user.id,
        title: req.body.title
      }, { $set: { title: req.body.modified } });
      if (data.modifiedCount === 0) {
        res.status(400).send("no data found");
      }
      else {
        res.status(200).send("sucess");
      }
    }
    catch {
      res.status(400).json("not updated");
    }
  }
})

module.exports = {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
