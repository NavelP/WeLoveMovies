// src/components/Reviews.js
import React, { useState, useEffect } from "react";

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const API_URL = process.env.REACT_APP_API_URL; // Ensure this is set in your .env file
        const reviewsUrl = `${API_URL}/movies/${movieId}/reviews`; // Create the full URL
        const response = await fetch(reviewsUrl); // Fetch using the constructed URL

        const data = await response.json();
        setReviews(data.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
    fetchReviews();
  }, [movieId]);

  return (
    <div className="reviews">
      <h4>Reviews:</h4>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.review_id}>
              <p>{review.content}</p>
              <small>Review by {review.preferred_name} from {review.organization_name}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default Reviews;
