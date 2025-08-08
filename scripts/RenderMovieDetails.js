const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

function RenderDetails(movie) {
  const container = document.getElementById("movie-detail-page");

  // Extract genre names
  const genreList = movie.genres?.map(genre => genre.name).join(', ') || "N/A";

  container.innerHTML = `
    <!-- Hero Section -->
    <section class="hero" style="background-image: url('${IMG_BASE}${movie.backdrop_path}'); width: 100%;">
      <div class="thumbnail">
        <img src="${IMG_BASE}${movie.poster_path}" alt="${movie.title}" />
      </div>
    </section>

    <!-- Action Buttons -->
    <section class="action-buttons text-center" style="margin-top: 3rem;">
      <button class="watch-btn">▶️ Watch Now</button>
      <button class="watch-btn" style="background: rgba(255, 255, 255, 0.1); margin-left: 1rem;">➕ Add to List</button>
      <button class="watch-btn" style="background: rgba(255, 255, 255, 0.1); margin-left: 1rem;">💖 Favorite</button>
    </section>

    <!-- Info Section -->
    <section class="desc-section text-center">
      <h2>Movie Details</h2>
      <div class="movie-meta" style="display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: center;">
        <h1 style="margin-top: 2rem; font-size: 3rem;">${movie.title}</h1>
        <p><strong>Year:</strong> ${new Date(movie.release_date).getFullYear()}</p>
        <p><strong>Genre:</strong> ${genreList}</p>
        <p><strong>Duration:</strong> ${movie.runtime || "N/A"} min</p>
        <p><strong>Rating:</strong> ⭐ ${movie.vote_average}/10 (${movie.vote_count} votes)</p>
        <p><strong>Status:</strong> ${movie.status}</p>
        <p><strong>Language:</strong> ${movie.original_language?.toUpperCase()}</p>
      </div>
      <h2 style="margin-top: 3rem;">Tagline</h2>
      <p><em>${movie.tagline || "No tagline available."}</em></p>

      <h2 style="margin-top: 3rem;">Description</h2>
      <p>${movie.overview || "No description available."}</p>
    </section>
  `;

  container.scrollIntoView({ behavior: "smooth" });
}

export default RenderDetails;
