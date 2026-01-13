import api from './api';

export const login = async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    // Using FormData as OAuth2PasswordRequestForm usually expects form data
    const response = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const getCurrentUser = async () => {
    // Determine if there is a specific endpoint for user info, usually /users/me
    // For now assuming we decode it or have an endpoint
    // Returning null placeholder if endpoint isn't generic
    return null;
}
