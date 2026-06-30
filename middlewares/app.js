const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// Middleware
const checkToken = (req, res, next) => {
  const { token } = req.query;

  if (token === "giveaccess") {
    return next();
  }

  next(new ExpressError(401, "ACCESS DENIED!"));
};

// API Route
app.get("/api", checkToken, (req, res) => {
  res.send("Data");
});

// Root Route
app.get("/", (req, res) => {
  res.send("Hi, I am root.");
});

// Random Route
app.get("/random", (req, res) => {
  res.send("This is a random page");
});

// Error Route
app.get("/err", (req, res, next) => {
  try {
    abcd = abcd; // Intentional Error
  } catch (err) {
    next(err);
  }
});

app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access to admin in Forbidden");
});

// 404 Route
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Final Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).send(message);
});

// Server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});