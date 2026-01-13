import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored token on mount
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const data = await loginService(username, password);
            // Assuming data contains { access_token, token_type, ... }
            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
                // If the backend returns user info, store it. 
                // For now, we'll store the username as a simple user object.
                const userData = { username };
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                return { success: true };
            }
            return { success: false, error: "No token received" };
        } catch (error) {
            console.error("Login failed", error);
            return { success: false, error: error.response?.data?.detail || "Login failed" };
        }
    };

    const register = async (userData) => {
        try {
            await registerService(userData);
            return { success: true };
        } catch (error) {
            console.error("Registration failed", error);
            return { success: false, error: error.response?.data?.detail || "Registration failed" };
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
