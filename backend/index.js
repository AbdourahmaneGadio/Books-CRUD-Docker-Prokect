const express = require("express");
const server = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "nailton123",
  database: process.env.DB_NAME || "crudgames",
});

server.use(express.json());
server.use(cors());

server.post("/", (req, res) => {
  res.status(200).json({
    message: "Bienvenue sur l´API Book CRUD",
  });
});

server.post("/register", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { categoryId } = req.body;
  const { authorId } = req.body;
  const { isbn } = req.body;
  const { parutionDate } = req.body;
  const { pageNumber } = req.body;
  const { synopsis } = req.body;
  const { image } = req.body;

  let sql =
    "INSERT INTO Book (name, cost, categoryId, authorId, isbn, parutionDate, pageNumber, synopsis, image) VALUES (?,?,?,?,?,?,?,?,?)";
  db.query(
    sql,
    [
      name,
      cost,
      categoryId,
      authorId,
      isbn,
      parutionDate,
      pageNumber,
      synopsis,
      image,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Une erreur est survenue.",
          err,
        });
      } else {
        console.log(result);
      }
    }
  );
});

server.get("/games", (req, res) => {
  let sql = "SELECT * FROM Book";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Une erreur est survenue.",
        err,
      });
    } else {
      res.send(result);
    }
  });
});

server.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { categoryId } = req.body;
  const { authorId } = req.body;
  const { isbn } = req.body;
  const { parutionDate } = req.body;
  const { pageNumber } = req.body;
  const { synopsis } = req.body;
  const { image } = req.body;

  let sql =
    "UPDATE Book SET name = ?, cost = ?, categoryId = ?, authorId = ?, isbn = ?, parutionDate = ?, pageNumber = ?, synopsis = ?, image = ? WHERE id = ?";
  db.query(
    sql,
    [
      name,
      cost,
      categoryId,
      authorId,
      isbn,
      parutionDate,
      pageNumber,
      synopsis,
      image,
      id,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Une erreur est survenue.",
          err,
        });
      } else {
        res.status(200).json({
          message: "Modification reussie.",
        });
      }
    }
  );
});

server.delete("/delete/:index", (req, res) => {
  const { index } = req.params;

  let sql = "DELETE FROM Book WHERE id = ?";
  db.query(sql, [index], (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Une erreur est survenue.",
        err,
      });
    } else {
      res.status(200).json({
        message: "Suppression reussie.",
      });
    }
  });
});

server.listen(3001, () => console.log("Running in the port 3001"));
