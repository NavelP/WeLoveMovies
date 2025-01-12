const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

async function update(updatedReview) {
  return knex("reviews")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview)
    .then(() => {
      return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select(
          "r.*",
          "c.preferred_name",
          "c.surname",
          "c.organization_name",
          "c.created_at as critic_created_at",
          "c.updated_at as critic_updated_at"
        )
        .where({ review_id: updatedReview.review_id })
        .first()
        .then(review => {
          // Format the critic data
          const formattedReview = {
            ...review,
            critic: {
              preferred_name: review.preferred_name,
              surname: review.surname,
              organization_name: review.organization_name,
              created_at: review.critic_created_at,
              updated_at: review.critic_updated_at,
            },
          };
          
          // Remove the duplicate critic fields from the root level
          delete formattedReview.preferred_name;
          delete formattedReview.surname;
          delete formattedReview.organization_name;
          delete formattedReview.critic_created_at;
          delete formattedReview.critic_updated_at;
          
          return formattedReview;
        });
    });
}

module.exports = {
  destroy,
  update,
  read,
};