const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;

const db = require("./models");
const Todo = db.Todo;
const User = db.User;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users/login", (req, res) => {
  res.render("login");
});

app.post("/users/login", (req, res) => {
  res.render("login");
});

app.get("/users/register", (req, res) => {
  res.render("register");
});

app.post("/users/register", (req, res) => {
  const { name, email, password } = req.body;
  User.create({ name, email, password }).then(() => res.redirect("/"));
});

app.get("/users/logout", (req, res) => {
  res.send("logout");
});

app.listen(PORT, () => {
  console.log(`Sever is running on http://localhost:${PORT}`);
});
