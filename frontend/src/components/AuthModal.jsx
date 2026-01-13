import { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, AlertCircle, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, register } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        birth_date: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Reset state when opening/closing
    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        let result;
        if (isLogin) {
            result = await login(formData.username, formData.password);
        } else {
            // Basic validation
            if (!formData.email || !formData.username || !formData.password || !formData.birth_date) {
                setError("All fields are required");
                setIsLoading(false);
                return;
            }
            result = await register(formData);
            if (result.success) {
                // Auto login after register or switch to login
                // For now, let's switch to login and show success msg or just login
                // nice to have: auto-login. The backend might not return token on register.
                setIsLogin(true);
                setError("Registration successful! Please log in.");
                setIsLoading(false);
                return;
            }
        }

        if (result.success) {
            onClose();
        } else {
            setError(result.error || "An error occurred");
        }
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal - using regular div for stability over motion.div for the container if complex layout */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden z-10"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-20"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col">
                    {/* Header Area */}
                    <div className="px-8 pt-8 pb-4 text-center">
                        <h2 className="text-2xl font-bold text-beeblack mb-2">
                            {isLogin ? 'Welcome Back!' : 'Join the Hive'}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {isLogin
                                ? 'Enter your details to access your account'
                                : 'Create an account to start rating movies'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
                        {/* Error Message */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2"
                                >
                                    <AlertCircle size={16} />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-honey-400 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            {!isLogin && (
                                <>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-honey-400 focus:border-transparent outline-none transition-all"
                                            required={!isLogin}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="date"
                                            name="birth_date"
                                            placeholder="Birth Date"
                                            value={formData.birth_date}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-honey-400 focus:border-transparent outline-none transition-all text-gray-600"
                                            required={!isLogin}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-honey-400 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-honey-500 hover:bg-honey-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-honey-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Processing...' : (isLogin ? 'Log In' : 'Create Account')}
                            {!isLoading && <ArrowRight size={20} />}
                        </button>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError('');
                                }}
                                className="text-honey-600 font-semibold hover:underline"
                            >
                                {isLogin ? 'Sign Up' : 'Log In'}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthModal;
