import { Hexagon, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-white text-beeblack">
            {/* Background Decorative Elements (Honeycombs) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
                {[...Array(20)].map((_, i) => (
                    <Hexagon
                        key={i}
                        className="absolute text-honey-500 fill-current"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 100 + 50}px`,
                            height: `${Math.random() * 100 + 50}px`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Text Content */}
                    <div className="md:w-1/2 z-10 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-1 rounded-full bg-honey-100 text-honey-800 font-semibold text-sm mb-6 border border-honey-200">
                                🐝 Join the Hive
                            </span>
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                                Rate what you <br />
                                <span className="text-honey-500 drop-shadow-sm">Watch</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
                                Discover your next obsession. Join a community of movie lovers and find the sweetest content curated just for you.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <button className="bg-beeblack text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:-translate-y-1 shadow-xl flex items-center justify-center gap-2">
                                    <Play size={20} fill="currentColor" /> Start Exploring
                                </button>
                                <button className="bg-honey-100 text-honey-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-honey-200 transition-all transform hover:-translate-y-1 border border-honey-200 flex items-center justify-center gap-2">
                                    <Star size={20} /> Top Rated
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hero Visual */}
                    <div className="md:w-1/2 mt-16 md:mt-0 relative flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative w-full max-w-lg"
                        >
                            {/* Abstract 'Hive' Composition */}
                            <div className="relative w-full aspect-square">
                                <div className="absolute inset-0 bg-honey-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                                {/* Center Card */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 w-64 rotate-[-6deg] z-20">
                                    <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden relative">
                                        {/* Placeholder for Movie Poster */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-honey-400 to-honey-600 flex items-center justify-center text-white font-bold text-2xl">
                                            The Hive
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                        <div className="flex items-center gap-1 text-honey-500 font-bold">
                                            <Star size={16} fill="currentColor" /> 9.8
                                        </div>
                                    </div>
                                </div>

                                {/* Back Card 1 */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-2/3 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 w-56 rotate-[12deg] z-10 opacity-80">
                                    <div className="h-32 bg-gray-800 rounded-xl mb-3"></div>
                                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                                </div>

                                {/* Back Card 2 */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-2/3 -translate-y-1/3 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 w-56 rotate-[-15deg] z-10 opacity-80">
                                    <div className="h-32 bg-gray-300 rounded-xl mb-3"></div>
                                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                                </div>
                            </div>

                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
                <svg className="relative block w-[calc(110%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-gray-50"></path>
                </svg>
            </div>
        </div>
    );
};

export default Hero;
