const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  const movieId = Number(request.params.movieId);
  if (isNaN(movieId)) {
    return next({
      status: 400,
      message: `Invalid movie ID: ${request.params.movieId}`,
    });
  }
  const movie = await service.read(movieId);
  if (movie) {
    response.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

async function list(request, response) {
  const { is_showing } = request.query;
  const data = await service.list(Boolean(is_showing));
  response.json({ data });
}

function read(request, response) {
  response.json({ data: response.locals.movie });
}

async function listTheaters(request, response) {
  const { movieId } = request.params;
  const data = await service.listTheaters(movieId);
  response.json({ data });
}

async function listReviews(request, response) {
  const { movieId } = request.params;
  const data = await service.listReviews(movieId);
  response.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
  listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)],
};