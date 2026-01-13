
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Search } from 'lucide-react';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
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

    const fetchMovies = async (searchQuery = '') => {
        setLoading(true);
        try {
            let url = 'http://localhost:8000/movies/popular';
            if (searchQuery) {
                url = `http://localhost:8000/movies/search?query=${encodeURIComponent(searchQuery)}`;
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
        fetchMovies(query);
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

                {/* Movies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading ? (
                        <div className="col-span-4 text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-honey-500 border-t-transparent"></div>
                            <p className="mt-2 text-gray-500">Loading movies...</p>
                        </div>
                    ) : movies.length > 0 ? (
                        movies.map((movie) => (
                            <MovieCard key={movie.id} {...movie} />
                        ))
                    ) : (
                        <div className="col-span-4 text-center py-20 text-gray-500 text-lg">
                            No movies found. Try searching for something else!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MoviesPage;
