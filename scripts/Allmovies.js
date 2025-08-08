
import { fetchPopularMovies } from './apifetch.js';
import renderMovies from "./RenderMovieCard.js";
let movies = [];
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => filterByGenre(e, btn.dataset.genre));
});

document.querySelectorAll('.discover-links a').forEach(link => {
    link.addEventListener('click', (e) => filterMovies(e, link.dataset.type));
});

    function filterByGenre(event, genre) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (genre === 'all') {
        renderMovies(movies, document.getElementById('moviesGrid'));
    } else {
        const filtered = movies.filter(movie => movie.genre_ids.includes(+genre));
          renderMovies(filtered, document.getElementById('moviesGrid'));
    }
}

function filterMovies(event, type) {
    document.querySelectorAll('.discover-links a').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');

    let filtered = [...movies];

    if (type === 'recent') {
        filtered = movies.filter(movie => movie.year >= 2020).sort((a, b) => b.year - a.year);
    } else if (type === 'random') {
        filtered = [...movies].sort(() => Math.random() - 0.5);
    } else {
        filtered = [...movies].sort((a, b) => b.rating - a.rating);
    }

     
    renderMovies(filtered, document.getElementById('moviesGrid'));
}


    function createBackgroundAnimation() {
            const bgAnimation = document.getElementById('bgAnimation');
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.width = particle.style.height = (Math.random() * 3 + 1) + 'px';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (Math.random() * 15 + 20) + 's';
                bgAnimation.appendChild(particle);
            }
        }

document.addEventListener('DOMContentLoaded', () => {
   
    fetchPopularMovies().then(data => {
        movies = data;    
        console.log(movies); // Array of movie objects
        renderMovies(movies, document.getElementById('moviesGrid'));

    });
     
    let currentFilter = 'all';


        // Show page
        createBackgroundAnimation();
        document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => filterByGenre(e, btn.dataset.genre));
});

document.querySelectorAll('.discover-links a').forEach(link => {
    link.addEventListener('click', (e) => filterMovies(e, link.dataset.type));
});



        const searchBox = document.querySelector('.search-box');
        searchBox.addEventListener('input', (event) => {
            const query = event.target.value.toLowerCase();
            const filtered = movies.filter(movie => movie.title.toLowerCase().includes(query));
            renderMovies(filtered, document.getElementById('moviesGrid'));
            });
});
