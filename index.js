import express from "express";

const app = express();

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    details:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald.",
    review:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. It is a novel of the Jazz Age and the Roaring Twenties, centering around the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    details:
      "To Kill a Mockingbird is a novel by Harper Lee published in 1960.",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    details:
      "1984 is a dystopian social science fiction novel by English novelist George Orwell.",
    review:
      "1984 is a dystopian social science fiction novel by English novelist George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
  },
];

const users = [];

app.get("/", (req, res) => {
  res.send("Server Is Running...");
});

app.listen(3000, () => {
  console.log("Server is running on port 6000");
});

//all books
app.get("/allbooks", (req, res) => {
  res.json(books);
});

//single book
app.get("/book/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    res.status(404).send("Book not found");
  }
  res.json(book);
});

//book by author
app.get("/book/author/:author", (req, res) => {
  const book = books.find((b) => b.author === req.params.author);
  if (!book) {
    res.status(404).send("Book not found");
  }
  res.json(book);
});

//book by title
app.get("/book/title/:title", (req, res) => {
  const book = books.find((b) => b.title === req.params.title);
  if (!book) {
    res.status(404).send("Book not found");
  }
  res.json(book);
});

//book review
app.get("/book/review/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    res.status(404).send("Book not found");
  }
  res.send(book.details);
});

//register new user
app.post("/register", (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  users.push(user);
  res.json(user, "User registered successfully");
});

//login
app.post("/login", (req, res) => {
  const user = users.find(
    (u) => u.email === req.body.email && u.password === req.body.password
  );
  if (!user) {
    res.status(404).send("User not found");
  }
  res.json(user, "User logged in successfully");
});

//add and modify book review
app.post("/addreview/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    res.status(404).send("Book not found");
  }
  book.review = req.body.review;
  res.json(book, "Review added successfully");
});

//delete book review
app.delete("/deletereview/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    res.status(404).send("Book not found");
  }
  book.review = "";
  res.json(book, "Review deleted successfully");
});

// Get all books – Using async callback function
app.get("/allbooks", async (req, res) => {
  try {
    const books = await getBooks();
    res.json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Search by ISBN – Using Promises
app.get("/book/:id", (req, res) => {
  getBookById(req.params.id)
    .then((book) => res.json(book))
    .catch((error) => res.status(500).send(error.message));
});
