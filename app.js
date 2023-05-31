const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");

// init app & middleware
const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

// db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("App is listening on port 3000");
    });
    db = getDb();
  }
});

//routes
app.get("/books", (req, res) => {
  let books = [];

  db.collection("books")
    .find() // return cursor toArray forEach
    .sort({ author: 1 })
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.get("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) =>
        res.status(500).json({ error: "Could not fetch the document" })
      );
  } else {
    res.status(500).json({ error: "Not a valid doc id" });
  }
});
