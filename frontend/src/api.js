const API_URL = process.env.REACT_APP_API_URL; // Adjust this URL if the backend is hosted elsewhere

export async function getMovies() {
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
// it can even be accessed directly from the browser, see