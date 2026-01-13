import { Hexagon } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-beeblack text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Branding */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <Hexagon className="h-6 w-6 text-honey-500 fill-honey-500" />
                            <span className="font-bold text-lg">Honey Score</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            The sweetest way to rate and discover your next favorite movie.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h3 className="font-semibold text-honey-400 mb-4">Discover</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Movies</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">TV Series</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Top Rated</a></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h3 className="font-semibold text-honey-400 mb-4">Community</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Leaderboard</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Hive Forums</a></li>
                        </ul>
                    </div>

                    {/* Newsletter or Legal */}
                    <div>
                        <h3 className="font-semibold text-honey-400 mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Honey Score. Made with 🍯.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
