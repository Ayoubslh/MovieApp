
import RenderDetails from "./RenderMovieDetails.js";
import { fetchMovieDetails } from "./apifetch.js";

async function fetchMovieDetailsById(movieId) {
    try {
        const movie = await fetchMovieDetails(movieId);
        return movie;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', async () => {   

const params = new URLSearchParams(window.location.search);
const movieId = parseInt(params.get('id'), 10);
console.log(await fetchMovieDetailsById(movieId));

RenderDetails(await fetchMovieDetailsById(movieId));

});
