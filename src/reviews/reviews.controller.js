const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(request, response, next) {
  const reviewId = Number(request.params.reviewId);
  if (isNaN(reviewId)) {
    return next({
      status: 400,
      message: `Invalid review ID: ${request.params.reviewId}`,
    });
  }
  const review = await service.read(reviewId);
  if (review) {
    response.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}

async function hasValidBody(request, response, next) {
  const { data } = request.body;
  if (!data) {
    return next({ status: 400, message: "Missing review data" });
  }
  next();
}

async function destroy(request, response) {
  await service.destroy(response.locals.review.review_id);
  response.sendStatus(204);
}

async function update(request, response) {
  const updatedReview = {
    ...response.locals.review,
    ...request.body.data,
    review_id: response.locals.review.review_id,
  };
  const data = await service.update(updatedReview);
  response.json({ data });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(hasValidBody),
    asyncErrorBoundary(update),
  ],
};