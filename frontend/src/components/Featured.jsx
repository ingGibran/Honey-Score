import MovieCard from './MovieCard';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Featured = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:8000/movies/popular');
                const data = await response.json();
                // Check if results exist and is an array
                if (data.results && Array.isArray(data.results)) {
                    // Take only first 4 for now, or however many fit the design
                    const mappedMovies = data.results.slice(0, 4).map(movie => ({
                        id: movie.id,
                        title: movie.title,
                        rating: movie.vote_average.toFixed(1), // format rating
                        genre: "N/A", // Genre mapping would require another API call or a map of IDs
                        year: movie.release_date ? movie.release_date.split('-')[0] : "N/A",
                        image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750"
                    }));
                    setMovies(mappedMovies);
                }
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <section id="featured" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-10">
                    <Sparkles className="text-honey-500" />
                    <h2 className="text-3xl font-bold text-beeblack">Featured Hits</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <MovieCard key={movie.id} {...movie} />
                        ))
                    ) : (
                        <div className="col-span-4 text-center text-gray-500">Loading popular movies...</div>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/movies" className="text-honey-600 font-semibold hover:text-honey-700 hover:underline">
                        View All Movies &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Featured;
