const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
export class MovieCarousel {
    constructor(containerId, movies = []) {
        this.container = document.getElementById(containerId);
        this.movies = movies.length > 0 ? movies : this.getDefaultMovies();
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.autoPlayDuration = 5000; // 5 seconds
        
        this.init();
    }
    
    getDefaultMovies() {
        return [
            {
                title: "Interstellar",
                description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Journey beyond the stars in this epic space odyssey.",
                poster: "./../assets/interstellar.jpeg",
                background: "./../assets/interstellarbg.jpeg"
            },
            {
                title: "Superman",
                description: "The Last Son of Krypton returns to protect Earth from new threats. Experience the legendary hero's greatest adventure as the Man of Steel soars again.",
                poster: "./../assets/superman.jpeg",
                background: "./../assets/supermanbg.jpeg"
            },
            {
                title: "Oppenheimer",
                description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb. A gripping tale of science, politics, and moral responsibility.",
                poster: "./../assets/openH.jpeg",
                background: "./../assets/openHbg.jpeg"
            }
        ];
    }
    
    init() {
        this.render();
        this.bindEvents();
        this.startAutoPlay();
    }
    
    render() {
        const carouselHTML = `
            <div class="carousel-wrapper">
                <div class="slides-wrapper" id="carousel">
                    ${this.movies.map((movie, index) => this.createSlide(movie, index)).join('')}
                </div>
            </div>
            
            <!-- Navigation Buttons -->
            <button class="carousel-btn left" id="prevBtn">&#10094;</button>
            <button class="carousel-btn right" id="nextBtn">&#10095;</button>
            
            <!-- Indicators -->
            <div class="indicators" id="indicators">
                ${this.movies.map((_, index) => 
                    `<div class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>`
                ).join('')}
            </div>
            
            <!-- Progress Bar -->
            <div class="progress-bar" id="progressBar"></div>
        `;
        
        this.container.innerHTML = carouselHTML;
        this.updateElements();
    }
    
    createSlide(movie, index) {
        return `
            <div class="carousel-slide" 
                 style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('${IMG_BASE}${movie.backdrop_path}');">
                <div class="content">
                    <div class="thumbnail">
                        <img src="${IMG_BASE}${movie.poster_path}" alt="${movie.title} Poster" />
                    </div>
                    <div class="text-content">
                        <h2>${movie.title}</h2>
                        <p>${movie.overview}</p>

                    </div>
                </div>
            </div>
        `;
    }
    
    updateElements() {
        this.carousel = document.getElementById('carousel'); // This is now the slides-wrapper
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.querySelectorAll('.indicator');
        this.progressBar = document.getElementById('progressBar');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.watchBtns = document.querySelectorAll('.watch-btn');
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        
     
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Pause auto-play on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Touch/swipe support
        this.addTouchSupport();
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
    
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
        this.restartAutoPlay();
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.movies.length;
        this.updateCarousel();
        this.restartAutoPlay();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.movies.length) % this.movies.length;
        this.updateCarousel();
        this.restartAutoPlay();
    }
    
    updateCarousel() {
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
        
        // Transform carousel using translateX - your CSS expects this approach
        const translateX = -this.currentSlide * 100;
        this.carousel.style.transform = `translateX(${translateX}%)`;
    }
    
    startAutoPlay() {
        this.pauseAutoPlay(); // Clear any existing interval
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDuration);
        
        this.animateProgressBar();
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        this.progressBar.style.animation = 'none';
    }
    
    restartAutoPlay() {
        this.startAutoPlay();
    }
    
    animateProgressBar() {
        this.progressBar.style.animation = 'none';
        // Force reflow
        this.progressBar.offsetHeight;
        this.progressBar.style.animation = `progress ${this.autoPlayDuration}ms linear infinite`;
    }
    
    onWatchClick(movieTitle) {
        // Custom callback for watch button clicks
        console.log(`Watch button clicked for: ${movieTitle}`);
        alert(`Starting ${movieTitle}...`);
        // You can customize this method to handle watch button clicks
        // For example: redirect to a streaming page, open a modal, etc.
    }
    
    // Public methods for external control
    addMovie(movie) {
        this.movies.push(movie);
        this.render();
        this.bindEvents();
    }
    
    removeMovie(index) {
        if (index >= 0 && index < this.movies.length) {
            this.movies.splice(index, 1);
            if (this.currentSlide >= this.movies.length) {
                this.currentSlide = 0;
            }
            this.render();
            this.bindEvents();
        }
    }
    
    updateMovie(index, newMovieData) {
        if (index >= 0 && index < this.movies.length) {
            this.movies[index] = { ...this.movies[index], ...newMovieData };
            this.render();
            this.bindEvents();
        }
    }
    
    setAutoPlayDuration(duration) {
        this.autoPlayDuration = duration;
        this.restartAutoPlay();
    }
    
    destroy() {
        this.pauseAutoPlay();
        this.container.innerHTML = '';
    }
}

// CSS styles - Removed since you have your own CSS file
// Make sure your HTML structure is:
// <div class="carousel-container" id="my-carousel"></div>

// Usage example:
// HTML: <div class="carousel-container" id="my-carousel"></div>
// const carousel = new MovieCarousel('my-carousel');

// Or with custom movies:
/*
const customMovies = [
    {
        title: "Custom Movie",
        description: "Your custom movie description",
        poster: "path/to/poster.jpg",
        background: "path/to/background.jpg"
    }
];
const carousel = new MovieCarousel('my-carousel', customMovies);
*/