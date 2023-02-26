const express = require("express");
const router = express.Router();

const db = require("../../models");
const Todo = db.Todo;

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", (req, res) => {
  const userId = req.user.id;
  const name = req.body.name;

  return Todo.create({ name, userId })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findByPk(id)
    .then((todo) => res.render("detail", { todo: todo.toJSON() }))
    .catch((error) => console.log(error));
});

router.get("/:id/edit", (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  return Todo.findOne({ where: { id, userId } })
    .then((todo) => res.render("edit", { todo: todo.toJSON() }))
    .catch((error) => console.log(error));
});

router.put("/:id", (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  const { name, isDone } = req.body;
  return Todo.update(
    { name, isDone: `${isDone === "on"}` },
    { where: { id, userId } }
  )
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  return Todo.destroy({ where: { id, userId } })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
