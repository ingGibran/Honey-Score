import { useRef, useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GenreCarousel = ({ genreId, title }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = direction === 'left' ? -container.offsetWidth + 200 : container.offsetWidth - 200;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let url = 'http://localhost:8000/movies/popular';
                if (genreId) {
                    url = `http://localhost:8000/movies/best-by-genre?genres=${genreId}`;
                }
                const response = await fetch(url);
                const data = await response.json();

                if (data.results && Array.isArray(data.results)) {
                    // Take first 20 (TMDB standard page size)
                    const mappedMovies = data.results.slice(0, 20).map(movie => ({
                        id: movie.id,
                        title: movie.title,
                        rating: movie.vote_average.toFixed(1),
                        genre: "N/A",
                        year: movie.release_date ? movie.release_date.split('-')[0] : "N/A",
                        image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750"
                    }));
                    setMovies(mappedMovies);
                }
            } catch (error) {
                console.error(`Failed to fetch movies for ${title}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [genreId, title]);

    if (!loading && movies.length === 0) {
        return (
            <div className="mb-12 px-8">
                <h3 className="text-2xl font-bold text-beeblack mb-4">{title}</h3>
                <div className="text-red-500">Failed to load movies or no movies found.</div>
            </div>
        );
    }

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6 px-4 sm:px-6 lg:px-8">
                <h3 className="text-2xl font-bold text-beeblack">{title}</h3>
                <Link
                    to={genreId ? `/movies?genre=${genreId}` : '/movies'}
                    className="flex items-center text-honey-600 hover:text-honey-700 font-medium text-sm transition-colors group"
                >
                    View All <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="relative group/carousel">
                {/* Left Scroll Button */}
                {!loading && movies.length > 0 && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-md text-gray-700 hover:bg-white hover:text-honey-600 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hidden md:block"
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-4 pb-8 px-4 sm:px-6 lg:px-8 snap-x no-scrollbar scroll-smooth"
                >
                    {loading ? (
                        // Skeleton skeletons
                        [...Array(5)].map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-[200px] h-[300px] bg-gray-200 rounded-xl animate-pulse"></div>
                        ))
                    ) : (
                        movies.map((movie) => (
                            <div key={movie.id} className="flex-shrink-0 w-[200px] snap-start">
                                <MovieCard {...movie} />
                            </div>
                        ))
                    )}
                </div>

                {/* Right Scroll Button */}
                {!loading && movies.length > 0 && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-md text-gray-700 hover:bg-white hover:text-honey-600 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hidden md:block"
                    >
                        <ChevronRight size={24} />
                    </button>
                )}

                {/* Fade effect on right edge for decoration */}
                <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10 hidden md:block"></div>
            </div>
        </div>
    );
};

export default GenreCarousel;
