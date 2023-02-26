const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("hello world!");
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
  res.render("register");
});

app.get("/users/logout", (req, res) => {
  res.send("logout");
});

app.listen(PORT, () => {
  console.log(`Sever is running on http://localhost:${PORT}`);
});
