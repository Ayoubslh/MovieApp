
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
function renderMovies(moviesToRender, parentElement) {

            const grid = parentElement;
            grid.innerHTML = '';
            
            moviesToRender.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.className = 'movie-card';
                movieCard.innerHTML = `
                    <div class="movie-poster"><img src="${IMG_BASE}${movie.poster_path}" alt="${movie.title}"></div>
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-info">
                        <span>${movie.release_date.split('-')[0]}</span>
                        <div class="movie-rating">⭐ ${movie.vote_average}</div>
                    </div>
                    <p class="movie-description">${movie.overview}</p>
                `;
                
                movieCard.addEventListener('click', () => {
  window.location.href = `./../pages/details.html?id=${movie.id}`;
});
                grid.appendChild(movieCard);
            });
        }

        
         
      


export default renderMovies;