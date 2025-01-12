if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const moviesRouter = require("./movies/movies.router");

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (request, response) => {
  response.json({
    data: "Welcome to WeLoveMovies API",
  });
});

// Movies route
app.use("/movies", moviesRouter);

// Catch-all for undefined routes
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;