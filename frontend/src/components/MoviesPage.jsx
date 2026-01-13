
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Search, Sparkles } from 'lucide-react';

const GENRES = [
    { id: null, name: 'Popular' },
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
];

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [loading, setLoading] = useState(false);

    const mapMovies = (results) => {
        return results.map(movie => ({
            id: movie.id,
            title: movie.title,
            rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",
            genre: "N/A",
            year: movie.release_date ? movie.release_date.split('-')[0] : "N/A",
            image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750"
        }));
    };

    const fetchMovies = async (searchQuery = '', genreId = null) => {
        setLoading(true);
        try {
            let url = 'http://localhost:8000/movies/popular';
            if (searchQuery) {
                url = `http://localhost:8000/movies/search?query=${encodeURIComponent(searchQuery)}`;
            } else if (genreId) {
                url = `http://localhost:8000/movies/best-by-genre?genres=${genreId}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (data.results && Array.isArray(data.results)) {
                setMovies(mapMovies(data.results));
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.error("Failed to fetch movies:", error);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch of popular movies
        fetchMovies();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setSelectedGenre(null);
        fetchMovies(query, null);
    };

    const handleGenreSelect = (id) => {
        setSelectedGenre(id);
        setQuery('');
        fetchMovies('', id);
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Search Bar */}
                <div className="mb-12 max-w-2xl mx-auto">
                    <form onSubmit={handleSearch} className="relative flex items-center">
                        <input
                            type="text"
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent shadow-sm text-gray-700 bg-white placeholder-gray-400 transition-all duration-300 ease-in-out"
                            placeholder="Search for movies..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <div className="absolute left-4 text-gray-400">
                            <Search size={20} />
                        </div>
                        <button
                            type="submit"
                            className="absolute right-2 bg-honey-500 text-white px-4 py-1.5 rounded-full hover:bg-honey-600 transition-colors duration-300 font-medium text-sm"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Content Layout */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Genres */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                            <h3 className="text-lg font-bold text-beeblack mb-4 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-honey-500" />
                                Genres
                            </h3>
                            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 no-scrollbar">
                                {GENRES.map((genre) => (
                                    <button
                                        key={genre.name}
                                        onClick={() => handleGenreSelect(genre.id)}
                                        className={`text-left px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap text-sm font-medium ${selectedGenre === genre.id
                                            ? 'bg-honey-500 text-white shadow-md transform translate-x-1'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-honey-600'
                                            }`}
                                    >
                                        {genre.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Movies Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {loading ? (
                                <div className="col-span-3 text-center py-20">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-honey-500 border-t-transparent"></div>
                                    <p className="mt-2 text-gray-500">Loading movies...</p>
                                </div>
                            ) : movies.length > 0 ? (
                                movies.map((movie) => (
                                    <MovieCard key={movie.id} {...movie} />
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-20 text-gray-500 text-lg">
                                    No movies found. Try searching for something else!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviesPage;
