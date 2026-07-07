const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

/* Register a new user */
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

/* Get all books (Axios + async/await) */
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3000/");
    return res.status(200).send(JSON.stringify(response.data, null, 4));
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

/* Get book details by ISBN (Axios + async/await) */
public_users.get('/isbn/:isbn', async (req, res) => {
  const { isbn } = req.params;

  try {
    const response = await axios.get(`http://localhost:3000/isbn/${isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "Book not found" });
  }
});

/* Get books by author (Axios + async/await) */
public_users.get('/author/:author', async (req, res) => {
  const { author } = req.params;

  try {
    const response = await axios.get(`http://localhost:3000/author/${author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "Book not found" });
  }
});

/* Get books by title (Axios + async/await) */
public_users.get('/title/:title', async (req, res) => {
  const { title } = req.params;

  try {
    const response = await axios.get(`http://localhost:3000/title/${title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "Book not found" });
  }
});

/* Get book review (Axios + async/await) */
public_users.get('/review/:isbn', async (req, res) => {
  const { isbn } = req.params;

  try {
    const response = await axios.get(`http://localhost:3000/review/${isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
