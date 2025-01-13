// src/components/Theaters.js
import React, { useState, useEffect } from "react";

function Theaters({ movieId }) {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    async function fetchTheaters() {
      try {
        const API_URL = process.env.REACT_APP_API_URL; // Ensure this is set in your .env file
        const theatersUrl = `${API_URL}/movies/${movieId}/theaters`; // Create the full URL
        const response = await fetch(theatersUrl); // Fetch using the constructed URL

        const data = await response.json();
        setTheaters(data.data);
      } catch (error) {
        console.error("Error fetching theaters:", error);
      }
    }
    fetchTheaters();
  }, [movieId]);

  return (
    <div className="theaters">
      <h4>Available Theaters:</h4>
      {theaters.length > 0 ? (
        <ul>
          {theaters.map((theater) => (
            <li key={theater.theater_id}>
              <p>{theater.name} - {theater.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No theaters available.</p>
      )}
    </div>
  );
}

export default Theaters;
