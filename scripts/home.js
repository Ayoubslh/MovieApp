 import {MovieCarousel} from "./CarouselClass.js";
import { fetchPopularMovies } from './apifetch.js';
 import renderMovies from "./RenderMovieCard.js";


 const carouselContainer = document.getElementById('carouselContainer');

 // Smooth scroll for navigation
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Movie card interactions
        document.querySelectorAll('.movie-card').forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                console.log(`Playing: ${title}`);
            });
        });

        // Category interactions
        document.querySelectorAll('.category').forEach(category => {
            category.addEventListener('click', () => {
                const genre = category.querySelector('h3').textContent;
                console.log(`Browsing: ${genre}`);
            });
        });
        document.addEventListener('DOMContentLoaded', () => {

           
            fetchPopularMovies().then(movies => {
               
                 const carousel = new MovieCarousel('carouselContainer',movies.slice(0, 5));
            renderMovies(movies.slice(0, 10), document.getElementById('movieGrid'));
            renderMovies(movies.slice(10, 20), document.getElementById('recommendedMovies'));

            renderMovies(movies.filter(movie => movie.genre_ids.includes(28)).slice(0, 5), document.getElementById('actionMovies'));
            renderMovies(movies.filter(movie => movie.genre_ids.includes(35)).slice(0, 5), document.getElementById('comedyMovies'));
            renderMovies(movies.filter(movie => movie.genre_ids.includes(18)).slice(0, 5), document.getElementById('dramaMovies'));

            });

          
        });
