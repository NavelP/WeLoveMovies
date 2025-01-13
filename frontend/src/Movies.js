// src/Movies.js
import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // Import the modal
import Reviews from "./components/Reviews";  // Import the Reviews component
import Theaters from "./components/Theaters"; // Import the Theaters component

const API_URL = process.env.REACT_APP_API_URL; // Adjust this URL if needed

async function getMovies() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

function Movies() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null); // Track the selected movie for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility

  useEffect(() => {
    async function fetchMovies() {
      const data = await getMovies();
      if (data) {
        setMovies(data.data); // Set the movies data to the state
      }
    }
    fetchMovies();
  }, []);

  const openModal = (movieId) => {
    setSelectedMovieId(movieId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovieId(null);
  };

  return (
    <div>
      {movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.movie_id} className="movie-card">
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>

              <button onClick={() => openModal(movie.movie_id)}>Reviews and Theaters</button>
            </div>
          ))}
        </div>
      ) : (
        <p className='ttpg'>No movies available.</p>
      )}

      {/* Modal for Reviews and Theaters */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Reviews and Theaters</h2>
        {selectedMovieId && (
          <>
            <Reviews movieId={selectedMovieId} />
            <Theaters movieId={selectedMovieId} />
          </>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default Movies;
