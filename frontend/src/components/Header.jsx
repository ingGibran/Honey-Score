import { Link } from 'react-router-dom';
import { Hexagon, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import AuthModal from './AuthModal';

const Header = () => {
    const { user, logout } = useAuth();
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);

    // Placeholder for modal toggle
    const toggleModal = () => setAuthModalOpen(!isAuthModalOpen);

    return (
        <>
            <header className="bg-white shadow-sm border-b border-honey-300 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="relative">
                                <Hexagon className="h-8 w-8 text-honey-500 fill-honey-100 group-hover:fill-honey-200 transition-colors" />
                                {/* Visual sweetener: small dot or line could go here */}
                            </div>
                            <span className="font-bold text-xl text-beeblack tracking-tight">
                                Honey <span className="text-honey-600">Score</span>
                            </span>
                        </Link>

                        {/* Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-600 hover:text-honey-600 font-medium transition-colors">
                                Home
                            </Link>
                            <Link to="/movies" className="text-gray-600 hover:text-honey-600 font-medium transition-colors">
                                Search
                            </Link>
                        </nav>

                        {/* Auth Controls */}
                        <div className="flex items-center space-x-4">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                        <div className="h-8 w-8 rounded-full bg-honey-100 flex items-center justify-center text-honey-700">
                                            <User size={18} />
                                        </div>
                                        <span className="hidden sm:inline">{user.username}</span>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="text-gray-500 hover:text-red-500 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex space-x-3">
                                    <button
                                        onClick={toggleModal} // This will eventually open the modal
                                        className="text-gray-600 hover:text-honey-600 font-medium transition-colors px-3 py-2"
                                    >
                                        Log In
                                    </button>
                                    <button
                                        onClick={toggleModal}
                                        className="bg-honey-500 hover:bg-honey-600 text-white font-medium px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Placeholder - easy to add if needed */}
            </header>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
        </>
    );
};

export default Header;
