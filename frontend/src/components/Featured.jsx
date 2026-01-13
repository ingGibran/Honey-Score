import MovieCard from './MovieCard';
import { Sparkles } from 'lucide-react';

const Featured = () => {
    // Dummy data for now, would be fetched from API
    const movies = [
        {
            id: 1,
            title: "Inception",
            rating: "9.6",
            genre: "Sci-Fi",
            year: "2010",
            image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "The Dark Knight",
            rating: "9.8",
            genre: "Action",
            year: "2008",
            image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "Interstellar",
            rating: "9.5",
            genre: "Sci-Fi",
            year: "2014",
            image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 4,
            title: "Dune: Part Two",
            rating: "9.4",
            genre: "Sci-Fi",
            year: "2024",
            image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <section id="featured" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-10">
                    <Sparkles className="text-honey-500" />
                    <h2 className="text-3xl font-bold text-beeblack">Featured Hits</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="text-honey-600 font-semibold hover:text-honey-700 hover:underline">
                        View All Movies &rarr;
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Featured;
