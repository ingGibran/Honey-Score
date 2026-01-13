import { Sparkles } from 'lucide-react';
import GenreCarousel from './GenreCarousel';

const GENRES = [
    { id: null, name: 'Trending Now' },
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

const Featured = () => {
    return (
        <section id="featured" className="py-12 bg-gray-50 overflow-hidden">
            <div className="max-w-[1920px] mx-auto">
                <div className="flex items-center gap-2 mb-10 px-4 sm:px-6 lg:px-8">
                    <Sparkles className="text-honey-500" />
                    <h2 className="text-3xl font-bold text-beeblack">Browse by Genre</h2>
                </div>

                <div className="flex flex-col gap-4">
                    {GENRES.map((genre) => (
                        <GenreCarousel
                            key={genre.name}
                            genreId={genre.id}
                            title={genre.name}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Featured;
