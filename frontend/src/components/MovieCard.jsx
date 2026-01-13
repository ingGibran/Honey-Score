import { Star, Hexagon } from 'lucide-react';
import { motion } from 'framer-motion';

const MovieCard = ({ title, rating, image, genre, year }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group cursor-pointer"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Hexagon size={16} className="text-honey-500 fill-honey-500" />
                    <span className="font-bold text-sm text-gray-800">{rating}</span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-beeblack/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-honey-500 text-white px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Rate Now
                    </button>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-beeblack line-clamp-1 group-hover:text-honey-600 transition-colors">
                        {title}
                    </h3>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{genre}</span>
                    <span>{year}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieCard;
